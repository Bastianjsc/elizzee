import React from "react";

export default function CambiosDevolucionesPage() {
  return (
    <div className="min-h-screen bg-white w-full text-black font-sans">
      <div className="pt-16 pb-24 px-6 md:px-12 max-w-[800px] mx-auto">
        
        <div className="flex flex-col items-center mb-16 text-center">
          <h1 className="text-3xl md:text-5xl font-light tracking-widest uppercase mb-4 text-balance">
            Política de Reembolso
          </h1>
          <div className="w-12 h-[1px] bg-black mt-8" />
        </div>

        <div className="space-y-8 text-sm md:text-base text-gray-600 leading-relaxed font-serif">
          <p>
            En ELIZZEÈ nos preocupamos por la excelencia y calidad de nuestros productos. Todos nuestros artículos son revisados y pasan por controles de calidad antes de ser enviados, asegurando que sean despachados en óptimas condiciones y correctamente embalados.
          </p>

          <div>
            <h2 className="text-lg md:text-xl font-sans font-medium text-black uppercase tracking-widest mb-4">1. Procedimiento de Cambios y Devoluciones</h2>
            <p className="font-bold text-black mb-2">Solo aceptaremos cambios o devoluciones en los siguientes casos:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Cuando se compruebe una falla o defecto atribuible a la fabricación del producto.</li>
              <li>Cuando el producto llegue dañado durante el transporte y el reclamo se realice en los plazos indicados.</li>
            </ul>
            
            <p className="font-bold text-black mb-2">No realizamos cambios ni devoluciones en los siguientes casos:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Si el producto no es de tu agrado o te arrepientes de la compra (no aplica garantía de satisfacción).</li>
              <li>Si el resultado de la aplicación no es el esperado debido a una técnica inadecuada.</li>
              <li>Si el color o tipo de producto no es el que querías porque fue seleccionado erróneamente al momento de la compra.</li>
            </ul>

            <p>En caso de falla de fabricación, nos comprometemos a evaluar el producto en un plazo de hasta 10 días hábiles desde su recepción en nuestra oficina. Si se confirma la falla, podrás optar por el envío de un producto nuevo del mismo tipo o el reembolso del valor pagado.</p>
          </div>

          <div>
            <h2 className="text-lg md:text-xl font-sans font-medium text-black uppercase tracking-widest mb-4">2. Casos especiales: Lámparas UV</h2>
            <p className="mb-2">Debido a su naturaleza frágil, las lámparas UV deben ser revisadas inmediatamente al recibir el paquete. Si detectas daño físico en la lámpara, debes informarnos en un plazo máximo de 24 horas corridas desde la entrega.</p>
            <p className="font-bold text-black mt-4 mb-2">Es obligatorio enviar:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Fotografía o video del daño.</li>
              <li>Fotografía del embalaje y etiqueta de envío.</li>
            </ul>
            <p>Si el daño se debe a fallo de embalaje o manipulación en transporte, ELIZZEÈ gestionará el reclamo con Blue Express y enviará un reemplazo sin costo adicional. Si el daño ocurre por causas posteriores a la entrega o por mal uso, no aplicará cambio ni devolución.</p>
          </div>

          <div>
            <h2 className="text-lg md:text-xl font-sans font-medium text-black uppercase tracking-widest mb-4">3. Protección en caso de datos erróneos</h2>
            <p>Si al realizar la compra ingresaste datos incorrectos (dirección, comuna, teléfono, etc.), podremos corregirlos siempre que el pedido no haya sido despachado. Si el pedido ya fue entregado al courier, cualquier modificación deberá ser gestionada directamente con Blue Express. ELIZZEÈ no se responsabiliza por retrasos o devoluciones ocasionadas por direcciones erróneas.</p>
          </div>

          <div>
            <h2 className="text-lg md:text-xl font-sans font-medium text-black uppercase tracking-widest mb-4">4. Protección en caso de entregas erróneas</h2>
            <p className="mb-2">Si recibes un producto distinto al que solicitaste, deberás informarnos dentro de las 48 horas posteriores a la entrega, enviando:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Fotografía del producto recibido.</li>
              <li>Número de serie o código impreso en la etiqueta.</li>
            </ul>
            <p className="italic">Importante: el producto no debe haber sido abierto previamente. ELIZZEÈ enviará el producto correcto sin costo adicional, previa devolución del producto recibido por error.</p>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <h2 className="text-lg md:text-xl font-sans font-medium text-black uppercase tracking-widest mb-3">5. Cómo solicitar un Cambio o Devolución</h2>
            <p>Para iniciar un proceso, escríbenos indicando tu número de pedido, fotografías del producto y una breve descripción del motivo:</p>
            <div className="mt-4 space-y-2 font-sans">
              <p>📩 <span className="font-bold">Correo electrónico:</span> ventas@elizzee.com</p>
              <p>📱 <span className="font-bold">WhatsApp:</span> +56 9 5390 6875</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}