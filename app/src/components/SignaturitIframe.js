export default function SignaturitIframe () {
  return (
    <>
      <script type='text/javascript' src='//code.jquery.com/jquery-2.1.1.min.js' />
      <script type='text/javascript'>$('body').append('<iframe src="' + SIGN_URL + '" style='position: absolute; top: 0; left: 0; height: 320px; width: 240px' />')</script>

    </>
  )
}
