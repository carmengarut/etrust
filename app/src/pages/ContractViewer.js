import { useEffect, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import SectionTitle from '../components/SectionTitle'
import { downloadFile, uploadPdf } from '../services/deals'
import { useDrop } from 'react-dnd'
import { PDFDocument } from 'pdf-lib'

import '../css/contractViewer.css'
import { DraggableBox } from '../components/DraggableBox'
import { CustomDragLayer } from '../components/CustomDragLayer'
import AddSignatureModal from '../components/AddSignatureModal'
import { signDeal } from '../reducers/dealReducer'

export default function ContractViewer () {
  const user = useSelector(state => state.user)
  const deals = useSelector(state => state.deals)
  const { key } = useParams()
  const [pdf, setPdf] = useState(null)
  const [countOfPages, setCountOfPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageRendering, setPageRendering] = useState(false)
  const [showSignatureModal, setShowSignatureModal] = useState(false)
  const [boxes, setBoxes] = useState([])
  const [coordinates, setCoordinates] = useState({})
  const [, updateState] = useState()
  const forceUpdate = useCallback(() => updateState({}), [])
  const dispatch = useDispatch()

  let pageNumPending = null

  useEffect(() => {

  }, [boxes])

  const history = useHistory()
  const { t } = useTranslation('global')

  const loadPDF = async (key) => {
    let url
    if (key) {
      url = await downloadFile(key)

      // We import this here so that it's only loaded during client-side rendering.
      const pdfJS = await import('pdfjs-dist/legacy/build/pdf')
      pdfJS.GlobalWorkerOptions.workerSrc = window.location.origin + '/pdf.worker.min.js'
      pdfJS.getDocument({ url: url }).promise.then((doc) => {
        setPdf(doc)
        setCountOfPages(doc.numPages)
      })
    }
  }
  async function renderCurrentPage () {
    setPageRendering(true)
    const page = await pdf.getPage(currentPage)
    const viewport = page.getViewport({ scale: 1.5 })

    // Prepare canvas using PDF page dimensions.

    const canvas = document.getElementById('canvas')
    setCoordinates(canvas.getBoundingClientRect())
    const canvasContext = canvas.getContext('2d')
    canvas.height = viewport.height
    canvas.width = viewport.width

    // Render PDF page into canvas context.
    const renderContext = { canvasContext, viewport }
    const renderTask = page.render(renderContext)

    renderTask.promise.then(function () {
      setPageRendering(false)
      if (pageNumPending !== null) {
        // New page rendering is pending
        pageNumPending = null
        renderCurrentPage(pageNumPending)
      }
    })
  }

  function queueRenderPage (num) {
    if (pageRendering) {
      pageNumPending = num
    } else {
      renderCurrentPage(num)
    }
  }

  useEffect(async () => {
    (() => loadPDF(key))()
  }, [])

  useEffect(() => {
    if (pdf) {
      queueRenderPage(currentPage)
    }
  }, [pdf, currentPage])

  if (!key) {
    return null
  }

  const handleNext = () => {
    const isValidPage = currentPage < countOfPages
    if (isValidPage) {
      setCurrentPage(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    const isValidPage = currentPage - 1 > 0
    if (isValidPage) {
      setCurrentPage(prev => prev - 1)
    }
  }

  // window.screen.width >= 800
  //   ? ({
  //       a: { top: 150, left: 85, title: t('contract_viewer.your_signature') },
  //       b: { top: 230, left: 85, title: t('contract_viewer.other_parties_signature') }
  //     })
  //   : ({
  //       a: { top: 190, left: 10, title: t('contract_viewer.your_signature') },
  //       b: { top: 190, left: 110, title: t('contract_viewer.other_parties_signature') }
  //     })
  const moveBox = (id, left, top) => {
    setBoxes(prev => {
      prev.map(box => {
        if (box.id === id) {
          box.left = left
          box.top = top
          box.page = currentPage
        }
        return box
      })
      return prev
    })
  }

  const [, drop] = useDrop(
    () => ({
      accept: 'div',
      drop (item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset()
        const left = Math.round(item.left + delta.x)
        const top = Math.round(item.top + delta.y + (item.left < 310 ? window.pageYOffset : 0))
        moveBox(item.id, left, top)
        forceUpdate()
        return undefined
      }
    }),
    [moveBox]
  )

  async function createPDFDocument () {
    const url = await downloadFile(key)
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
    const document = await PDFDocument.load(existingPdfBytes)

    boxes.map(async box => {
      const page = document.getPage(box.page - 1)
      const imgBuffer = box.src
      const img = await document.embedPng(imgBuffer)

      const { height, width } = img.scale(1)
      console.log(coordinates)
      page.drawImage(img, {
        x: box.left - coordinates.left,
        y: page.getHeight() - (box.top - coordinates.top) - height / 2,
        width: width / 1.5,
        height: height / 1.5
        // x: page.getWidth() / 2 - width / 2,
        // y: page.getHeight() / 2 - height / 2
      })
      console.log(box.left)
      console.log(coordinates.left)
      console.log('x: ' + (box.left - coordinates.left) + ', y: ' + (page.getHeight() - (box.top - coordinates.top)))
      console.log(page.getWidth())
      console.log(page.getHeight())
    })

    try {
      const doc = await document.save()
      const docBase64 = Buffer.from(doc).toString('base64')
      const newObject = {
        base64: docBase64,
        contractTitle: Date.now().toString() + '-signed-' + key
      }

      await uploadPdf(newObject)
      return newObject.contractTitle
    } catch (e) {
      console.error(e.name)
      console.error(e.message)
    }
  }

  const handleContinue = () => {
    createPDFDocument().then((title) => {
      const deal = deals.find(deal => {
        if (deal.file === key || deal.filedSigned === key) {
          console.log(deal)
        }
        return (deal.file === key || deal.fileSigned === key) && (deal.createdBy.id === user.id || deal.createdBy === user.id || deal.member.id === user.id || deal.member === user.id)
      })
      const users = [...deal.signedBy.map(user => user.id), user.id]
      dispatch(signDeal(deal.id, { users: users, fileSigned: title }))
      history.push('/deals')
    }).catch((err) => console.error(err))
  }
  return (
    <div>
      <div className='cv-top-bar'>
        <SectionTitle>
          {t('contract_viewer.place_signatures_title')}
        </SectionTitle>
        <div className='cv-text'>
          {t('contract_viewer.place_signatures')}
        </div>
      </div>
      <div ref={drop} className='cv-signatures-container'>
        <button onClick={() => { setShowSignatureModal(true) }} className='cv-add-signature-button'>
          {t('contract_viewer.add_signature')}
        </button>
      </div>
      {console.log(boxes)}
      {boxes.map((box) => (
        <DraggableBox key={box.id} {...box} currentPage={currentPage} />
      ))}
      {/* <div className='cv-signature'>
        This is a signature
      </div> */}
      <CustomDragLayer />
      <div className='cv-pagination-container'>
        <div className='cv-pagination'>
          <button onClick={handlePrevious} id='previous' className='cv-button'> {t('contract_viewer.previous')}</button>
          <span id='current_page'>{currentPage}{t('contract_viewer.of')}{countOfPages}</span>
          <button onClick={handleNext} id='next' className='cv-button'>{t('contract_viewer.next')}</button>
        </div>
      </div>
      <div className='cv-box' ref={drop}>
        <canvas ref={drop} className='cv-canvas' id='canvas' />
      </div>
      <div className='cv-continue-button-container'>
        <button onClick={handleContinue} className='cv-continue-button'>{t('contract_viewer.continue')}</button>
      </div>
      <AddSignatureModal show={showSignatureModal} setShow={setShowSignatureModal} setBoxes={setBoxes} />
    </div>
  )
}
