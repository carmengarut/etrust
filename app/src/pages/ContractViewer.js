import { useEffect, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'
import SectionTitle from '../components/SectionTitle'
import { downloadFile } from '../services/deals'
import { useDrop } from 'react-dnd'
import update from 'immutability-helper'

import '../css/contractViewer.css'
import { DraggableBox } from '../components/DraggableBox'
import { CustomDragLayer } from '../components/CustomDragLayer'

export default function ContractViewer () {
  const { key } = useParams()
  const [pdf, setPdf] = useState(null)
  const [countOfPages, setCountOfPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageRendering, setPageRendering] = useState(false)
  let pageNumPending = null

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

  const [boxes, setBoxes] = useState({
    a: { top: 150, left: 100, title: t('contract_viewer.your_signature') },
    b: { top: 230, left: 100, title: t('contract_viewer.other_parties_signature') }
  })

  const moveBox = useCallback(
    (id, left, top) => {
      setBoxes(
        update(boxes, {
          [id]: {
            $merge: { left, top }
          }
        })
      )
    },
    [boxes]
  )

  const [, drop] = useDrop(
    () => ({
      accept: 'div',
      drop (item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset()
        const left = Math.round(item.left + delta.x)
        const top = Math.round(item.top + delta.y + (item.left < 310 ? window.pageYOffset : 0))
        moveBox(item.id, left, top)
        return undefined
      }
    }),
    [moveBox]
  )
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
      <div className='cv-signatures-container' />
      {Object.keys(boxes).map((key) => (
        <DraggableBox key={key} id={key} {...boxes[key]} />
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
      <button onClick={() => { history.push('/deals') }} className='cv-continue-button'>{t('contract_viewer.continue')}</button>
    </div>
  )
}
