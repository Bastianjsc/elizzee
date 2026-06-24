import React from "react";

export default function PoliticaEnviosPage() {
  return (
    <div className="min-h-screen bg-white w-full text-black font-sans">
      <div className="pt-16 pb-24 px-6 md:px-12 max-w-[800px] mx-auto">
        
        <div className="flex flex-col items-center mb-16 text-center">
          <h1 className="text-3xl md:text-5xl font-light tracking-widest uppercase mb-4 text-balance">
            Política de Envíos
          </h1>
          <div className="w-12 h-[1px] bg-black mt-8" />
        </div>

        <div className="space-y-8 text-sm md:text-base text-gray-600 leading-relaxed font-serif">
          
          <div>
            <h2 className="text-lg md:text-xl font-sans font-medium text-black uppercase tracking-widest mb-3">Responsabilidad de la compra</h2>
            <p className="mb-2">Todas las compras realizadas en nuestro sitio web son responsabilidad del comprador.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Si al momento de realizar la compra se ingresa un dato erróneo en la dirección o información de contacto, podremos corregirlo siempre que el pedido no haya sido despachado.</li>
              <li>En caso de que el pedido ya se encuentre en ruta o entregado, el cambio solo podrá gestionarse enviando nuevamente el producto solicitado, una vez que recibamos de vuelta el producto enviado por error.</li>
              <li>Los costos de devolución y del nuevo envío serán asumidos por el comprador.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg md:text-xl font-sans font-medium text-black uppercase tracking-widest mb-3">Envíos con Blue Express</h2>
            <p className="mb-2">En ELIZZEÈ nos encargamos de despachar de manera segura y oportuna tus productos, para que lleguen en óptimas condiciones. Todos los envíos se realizan a través de Blue Express, exclusivamente a domicilio.</p>
            <p className="font-bold text-black mt-4 mb-2">Es responsabilidad del cliente:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Entregar la dirección completa y correcta, incluyendo: RUT, nombre de la calle, número, comuna, número de departamento o casa (si aplica).</li>
              <li>En caso de que el domicilio no posea numeración, debe indicarlo explícitamente.</li>
              <li>Asegurarse de que haya una persona disponible para recibir el pedido (morador, conserje, etc.).</li>
              <li>El valor del envío será calculado en el momento de la compra y pagado junto con el pedido en nuestro sitio web.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg md:text-xl font-sans font-medium text-black uppercase tracking-widest mb-3">Plazos de envío y entrega</h2>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Todos los pedidos se procesan y despachan en un plazo de hasta 24 horas hábiles desde la confirmación del pago.</li>
              <li>Los pedidos confirmados después de las 17:00 hrs se procesarán el siguiente día hábil.</li>
              <li>Una vez despachado, recibirás un número de seguimiento para revisar el estado de tu envío en el portal de Blue Express.</li>
            </ul>
            <p className="font-bold text-black mb-2">Importante:</p>
            <p className="mb-2">El tiempo de entrega depende exclusivamente de Blue Express. No es posible modificar ni acelerar las fechas estimadas de entrega indicadas por la empresa de transporte. Eventualmente, la entrega podría demorar más de lo estimado debido a causas externas, como:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>"No hay moradores en el domicilio"</li>
              <li>"Dirección incorrecta" o "Falta de datos en la dirección"</li>
              <li>Otras incidencias de transporte</li>
            </ul>
            <p className="mt-4 italic">En estos casos, la responsabilidad recae en el cliente, quien deberá comunicarse con nuestro servicio al cliente para coordinar una nueva entrega.</p>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <h2 className="text-lg md:text-xl font-sans font-medium text-black uppercase tracking-widest mb-3">Servicio al cliente</h2>
            <p>Si tienes dudas o inconvenientes con tu envío, puedes contactarnos a través de:</p>
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