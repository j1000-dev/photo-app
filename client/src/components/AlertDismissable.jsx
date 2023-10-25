import Alert from 'react-bootstrap/Alert';

function AlertDismissable(props) {
  const { variant, message } = props
  return (
    <Alert variant={variant}>
      {message}
    </Alert>
  )
}

export default AlertDismissable