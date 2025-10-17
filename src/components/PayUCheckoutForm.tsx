"use client"

import { useEffect, useRef } from "react"
import { PAYU_CONFIG } from "../config/payu.config"
import { generatePayUSignature, generateReferenceCode } from "../utils/payuSignature"

interface PayUCheckoutFormProps {
  amount: number
  description: string
  buyerEmail: string
  onSubmit?: () => void
}

const PayUCheckoutForm = ({ amount, description, buyerEmail, onSubmit }: PayUCheckoutFormProps) => {
  const formRef = useRef<HTMLFormElement>(null)
  const referenceCode = useRef(generateReferenceCode())

  useEffect(() => {
    // Auto-submit el formulario cuando el componente se monta
    if (formRef.current) {
      console.log("[PayU] Enviando formulario a PayU...")
      console.log("[PayU] Referencia:", referenceCode.current)
      console.log("[PayU] Monto:", amount)
      console.log("[PayU] Email:", buyerEmail)

      if (onSubmit) onSubmit()
      formRef.current.submit()
    }
  }, [amount, buyerEmail, onSubmit])

  // Generar la firma
  const signature = generatePayUSignature(referenceCode.current, amount)

  return (
    <div>
      {/* Mensaje de carga */}
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h3>Redirigiendo a PayU...</h3>
        <p>Por favor espera mientras te redirigimos a la página de pago segura.</p>
      </div>

      {/* Formulario oculto que se envía a PayU */}
      <form ref={formRef} method="post" action={PAYU_CONFIG.paymentUrl} style={{ display: "none" }}>
        {/* Campos requeridos por PayU */}
        <input type="hidden" name="merchantId" value={PAYU_CONFIG.merchantId} />
        <input type="hidden" name="accountId" value={PAYU_CONFIG.accountId} />
        <input type="hidden" name="description" value={description} />
        <input type="hidden" name="referenceCode" value={referenceCode.current} />
        <input type="hidden" name="amount" value={amount} />
        <input type="hidden" name="tax" value="0" />
        <input type="hidden" name="taxReturnBase" value="0" />
        <input type="hidden" name="currency" value="PEN" />
        <input type="hidden" name="signature" value={signature} />
        <input type="hidden" name="test" value={PAYU_CONFIG.test ? "1" : "0"} />
        <input type="hidden" name="buyerEmail" value={buyerEmail} />
        <input type="hidden" name="responseUrl" value={PAYU_CONFIG.responseUrl} />
        {PAYU_CONFIG.confirmationUrl && (
          <input type="hidden" name="confirmationUrl" value={PAYU_CONFIG.confirmationUrl} />
        )}
      </form>
    </div>
  )
}

export default PayUCheckoutForm
