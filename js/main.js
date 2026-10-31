// ============================================================================
// PRE-ENTREGA 5: INSTANCIANDO OBJETOS (Programación Orientada a Objetos)
// Simulador de Inventario y Cotización — TechCore Hardware & PC
// Integra: Ciclos (M2) + Funciones (M3) + Arrays (M4) + Clases y Objetos (M5)
// ============================================================================

// Constantes globales del simulador
const NOMBRE_TIENDA_HARDWARE = "TechCore Hardware & PC";
const TASA_IVA_MEXICO = 0.16;
const MONTO_MINIMO_ENVIO_GRATIS = 10000;
const TARIFA_ENVIO_ESTANDAR = 250;

// ============================================================================
// 1. DEFINICIÓN DE LA CLASE PRINCIPAL (PascalCase, constructor con this y métodos)
// ============================================================================

class ProductoHardware {
    constructor(id, nombre, categoria, precio, stock) {
        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;
        this.stock = stock;
        this.disponible = stock > 0;
    }

    // Método de instancia 1: descuenta unidades del stock y actualiza disponibilidad
    vender(cantidadUnidades) {
        if (cantidadUnidades <= 0 || cantidadUnidades > this.stock) {
            console.log(
                `⚠️ Stock insuficiente para "${this.nombre}". Solicitado: ${cantidadUnidades} | Disponible: ${this.stock}`
            );
            return false;
        }

        this.stock -= cantidadUnidades;
        this.disponible = this.stock > 0;
        console.log(
            `✅ Venta registrada: ${cantidadUnidades}x "${this.nombre}". Stock restante: ${this.stock} unidad(es).`
        );
        return true;
    }

    // Método de instancia 2: modifica la propiedad precio aplicando un porcentaje de descuento
    aplicarDescuento(porcentajeDescuento) {
        if (porcentajeDescuento > 0 && porcentajeDescuento < 100) {
            const factorDescuento = 1 - porcentajeDescuento / 100;
            this.precio = Math.round(this.precio * factorDescuento * 100) / 100;
            console.log(
                `🏷️ Descuento del ${porcentajeDescuento}% aplicado a "${this.nombre}". Nuevo precio unitario: $${this.precio} MXN`
            );
        }
        return this.precio;
    }

    // Método de instancia 3: calcula y retorna el precio del producto con IVA incluido
    calcularPrecioConIva(tasaIva = TASA_IVA_MEXICO) {
        return Math.round(this.precio * (1 + tasaIva) * 100) / 100;
    }

    // Método de instancia 4: repone unidades en el inventario del objeto
    reponerStock(unidadesNuevas) {
        if (unidadesNuevas > 0) {
            this.stock += unidadesNuevas;
            this.disponible = this.stock > 0;
            console.log(
                `📦 Reposición de inventario: +${unidadesNuevas} uds. en "${this.nombre}". Stock actual: ${this.stock}`
            );
        }
        return this.stock;
    }

    // Método de instancia 5: devuelve una cadena formateada con el estado actual del objeto
    obtenerResumenProducto() {
        const estadoTexto = this.disponible ? `${this.stock} disp.` : "AGOTADO";
        return `[ID #${this.id}] ${this.nombre} (${this.categoria}) — $${this.precio} MXN (Con IVA: $${this.calcularPrecioConIva()} MXN) | Stock: ${estadoTexto}`;
    }
}

// ============================================================================
// 2. INSTANCIACIÓN DE OBJETOS CON EL OPERADOR 'new' GUARDADOS EN CONSTANTES
// ============================================================================

const procesadorRyzen = new ProductoHardware(
    1,
    "Procesador AMD Ryzen 7 7800X3D",
    "Procesadores",
    8400,
    12
);

const tarjetaGraficaRtx = new ProductoHardware(
    2,
    "Tarjeta Grafica NVIDIA RTX 4070 Super",
    "Tarjetas de Video",
    13900,
    8
);

const memoriaRamDdr5 = new ProductoHardware(
    3,
    "Memoria RAM Kit 32GB DDR5 6000MHz",
    "Memorias RAM",
    2450,
    15
);

const unidadSsdNvme = new ProductoHardware(
    4,
    "Unidad SSD NVMe M.2 Gen4 2TB",
    "Almacenamiento",
    2850,
    20
);

const monitorGamerQhd = new ProductoHardware(
    5,
    "Monitor Gamer 27 QHD 180Hz IPS",
    "Monitores",
    5600,
    6
);

// ============================================================================
// 3. VERIFICACIÓN EN CONSOLA DE LAS INSTANCIAS Y EJECUCIÓN DE SUS MÉTODOS
// ============================================================================

console.log("=== 1. VERIFICACIÓN DE OBJETOS INSTANCIADOS CON 'new ProductoHardware' ===");
console.log(procesadorRyzen);
console.log(tarjetaGraficaRtx);
console.log(memoriaRamDdr5);
console.log(unidadSsdNvme);
console.log(monitorGamerQhd);

console.log("\n=== 2. PRUEBA DE MÉTODOS DE INSTANCIA (MODIFICACIÓN DE PROPIEDADES) ===");
console.log("Estado inicial de tarjetaGraficaRtx:", tarjetaGraficaRtx.obtenerResumenProducto());
tarjetaGraficaRtx.aplicarDescuento(5); // Modifica tarjetaGraficaRtx.precio (-5% promo lanzamiento)
console.log("Estado de tarjetaGraficaRtx tras aplicarDescuento(5):", tarjetaGraficaRtx.obtenerResumenProducto());

console.log("Estado inicial de monitorGamerQhd:", monitorGamerQhd.obtenerResumenProducto());
monitorGamerQhd.vender(1); // Descuenta 1 unidad de monitorGamerQhd.stock
monitorGamerQhd.reponerStock(2); // Suma 2 unidades a monitorGamerQhd.stock
console.log("Estado de monitorGamerQhd tras vender(1) y reponerStock(2):", monitorGamerQhd.obtenerResumenProducto());

// ============================================================================
// 4. COLECCIÓN EN ARRAY DE OBJETOS Y MANIPULACIÓN (Continuidad Módulo 4)
// ============================================================================

const catalogoProductosHardware = [
    procesadorRyzen,
    tarjetaGraficaRtx,
    memoriaRamDdr5,
    unidadSsdNvme,
    monitorGamerQhd
];

// ============================================================================
// 5. FUNCIONES DEL SIMULADOR (Declaradas, Expresadas y Flecha - Continuidad M3)
// ============================================================================

// Función flecha para calcular el subtotal de una línea de compra
const calcularSubtotalLinea = (precioUnitario, cantidadUnidades) =>
    Math.round(precioUnitario * cantidadUnidades * 100) / 100;

// Función flecha para calcular el IVA sobre el subtotal neto
const calcularMontoIva = (montoBaseImponible, tasaImpuesto) =>
    Math.round(montoBaseImponible * tasaImpuesto * 100) / 100;

// Función flecha para determinar el costo de envío
const calcularCostoEnvio = (subtotalNeto, minimoEnvioGratis, tarifaBaseEnvio) =>
    subtotalNeto >= minimoEnvioGratis ? 0 : tarifaBaseEnvio;

// Función flecha para calcular cuotas a meses sin intereses
const calcularMensualidadPlan = (montoTotalFinal, plazoMeses) =>
    Math.round((montoTotalFinal / plazoMeses) * 100) / 100;

// Función expresada para calcular descuento adicional por volumen o cupón en el checkout
const calcularDescuentoCotizacion = function (subtotalBruto, cantidadTotalUnidades, codigoCuponIngresado) {
    let porcentajeVolumen = 0;

    if (cantidadTotalUnidades >= 5) {
        porcentajeVolumen = 0.10;
    } else if (cantidadTotalUnidades >= 3) {
        porcentajeVolumen = 0.05;
    }

    let porcentajeCupon = 0;
    const codigoLimpio = codigoCuponIngresado.trim().toUpperCase();

    if (codigoLimpio === "TECH10") {
        porcentajeCupon = 0.10;
    } else if (codigoLimpio === "GAMER15") {
        porcentajeCupon = 0.15;
    }

    const porcentajeCombinado = porcentajeVolumen + porcentajeCupon;
    return Math.round(subtotalBruto * porcentajeCombinado * 100) / 100;
};

// Función declarada que recorre el array de objetos con for...of y llama al método de cada instancia
function listarCatalogoObjetos(listaObjetosProducto, tituloListado) {
    console.log(`\n--- ${tituloListado} ---`);
    let textoCatalogo = `${tituloListado}:\n\n`;

    for (const producto of listaObjetosProducto) {
        const lineaResumen = producto.obtenerResumenProducto();
        console.log(lineaResumen);
        textoCatalogo += `${lineaResumen}\n`;
    }

    console.log(`Total de objetos en catálogo: ${listaObjetosProducto.length}\n`);
    return textoCatalogo;
}

// Función declarada que solicita el nombre del cliente
function solicitarNombreCliente(nombreTienda, nombrePorDefecto) {
    const respuestaNombre = prompt(
        `Bienvenido a ${nombreTienda} (Simulador POO con Clases y Objetos).\n\n` +
        "Por favor, ingresa tu nombre para iniciar la cotización:"
    );

    if (respuestaNombre === null || respuestaNombre.trim() === "") {
        return nombrePorDefecto;
    }

    return respuestaNombre.trim();
}

// Función declarada que muestra el menú interactivo leyendo las propiedades de cada objeto
function seleccionarProductoDelCatalogo(listaObjetosProducto, nombreCliente, subtotalAcumulado) {
    let textoMenu = `Cliente: ${nombreCliente} | Subtotal acumulado: $${subtotalAcumulado} MXN\n\n`;
    textoMenu += "Selecciona el número del producto que deseas comprar:\n";

    for (const producto of listaObjetosProducto) {
        textoMenu += `${producto.id}. ${producto.nombre} — $${producto.precio} MXN (Stock: ${producto.stock})\n`;
    }
    textoMenu += "0. Finalizar selección y calcular total";

    let opcionElegida = -1;
    while (opcionElegida < 0 || opcionElegida > listaObjetosProducto.length || isNaN(opcionElegida)) {
        const entrada = prompt(textoMenu);

        if (entrada === null) {
            return 0;
        }

        opcionElegida = parseInt(entrada, 10);

        if (isNaN(opcionElegida) || opcionElegida < 0 || opcionElegida > listaObjetosProducto.length) {
            alert(`Opción no válida. Ingresa un número entre 1 y ${listaObjetosProducto.length}, o 0 para terminar.`);
        }
    }

    return opcionElegida;
}

// Función declarada para solicitar la cantidad validando contra la propiedad stock del objeto
function solicitarCantidadParaObjeto(objetoProducto) {
    let cantidadSolicitada = 0;

    while (cantidadSolicitada < 1 || cantidadSolicitada > objetoProducto.stock || isNaN(cantidadSolicitada)) {
        const entradaCantidad = prompt(
            `Producto: ${objetoProducto.nombre}\n` +
            `Categoría: ${objetoProducto.categoria}\n` +
            `Precio unitario: $${objetoProducto.precio} MXN (Con IVA: $${objetoProducto.calcularPrecioConIva()} MXN)\n` +
            `Stock disponible en el objeto: ${objetoProducto.stock} unidad(es)\n\n` +
            `¿Cuántas unidades deseas comprar? (1 a ${objetoProducto.stock}):`,
            "1"
        );

        if (entradaCantidad === null) {
            return 1;
        }

        cantidadSolicitada = parseInt(entradaCantidad, 10);

        if (isNaN(cantidadSolicitada) || cantidadSolicitada < 1 || cantidadSolicitada > objetoProducto.stock) {
            alert(`Cantidad inválida. Solo hay ${objetoProducto.stock} unidad(es) disponibles de este producto.`);
        }
    }

    return cantidadSolicitada;
}

// Función declarada de salida: emite el resumen final y el estado actualizado de los objetos
function mostrarResumenFinal(
    nombreTienda,
    nombreCliente,
    listaObjetosProducto,
    detalleItemsTexto,
    totalUnidadesCompradas,
    subtotalBruto,
    montoDescuento,
    subtotalNeto,
    montoIva,
    costoEnvio,
    totalFinalPagar
) {
    listarCatalogoObjetos(
        listaObjetosProducto,
        "ESTADO FINAL DE LOS OBJETOS TRAS LA COMPRA (Propiedad stock actualizada)"
    );

    const resumenFinalTexto =
        "==================================================\n" +
        ` RESUMEN DE COMPRA — ${nombreTienda}\n` +
        "==================================================\n" +
        `Cliente: ${nombreCliente}\n` +
        `Unidades totales adquiridas: ${totalUnidadesCompradas}\n\n` +
        `Detalle de objetos adquiridos:\n${detalleItemsTexto}\n` +
        "--------------------------------------------------\n" +
        `Subtotal Bruto:      $${subtotalBruto} MXN\n` +
        `Descuento Aplicado: -$${montoDescuento} MXN\n` +
        `Subtotal Neto:       $${subtotalNeto} MXN\n` +
        `IVA (16%):          +$${montoIva} MXN\n` +
        `Costo de Envío:     +$${costoEnvio} MXN\n` +
        "--------------------------------------------------\n" +
        `TOTAL FINAL A PAGAR: $${totalFinalPagar} MXN\n` +
        "==================================================";

    console.log(resumenFinalTexto);
    console.log("--- SIMULACIÓN DE PAGOS A MESES SIN INTERESES ---");

    for (let plazoMeses = 3; plazoMeses <= 12; plazoMeses += 3) {
        const cuotaMensual = calcularMensualidadPlan(totalFinalPagar, plazoMeses);
        console.log(`Plan a ${plazoMeses} meses sin intereses: $${cuotaMensual} MXN / mes`);
    }

    alert(resumenFinalTexto);
}

// ============================================================================
// 6. EJECUCIÓN DEL SIMULADOR INTERACTIVO INTEGRAL (M2 + M3 + M4 + M5)
// ============================================================================

function iniciarSimuladorTiendaObjetos(
    nombreTienda,
    catalogoObjetos,
    tasaImpuestoIva,
    minimoEnvioGratis,
    tarifaEnvioBase
) {
    const nombreCliente = solicitarNombreCliente(nombreTienda, "Cliente Invitado");

    // Mostrar en consola y en un alert inicial el catálogo de objetos instanciados
    const resumenCatalogoInicial = listarCatalogoObjetos(
        catalogoObjetos,
        "CATÁLOGO INICIAL DE OBJETOS ProductoHardware"
    );
    alert(`Hola ${nombreCliente}.\n\n${resumenCatalogoInicial}`);

    let subtotalBrutoAcumulado = 0;
    let cantidadTotalUnidades = 0;
    let detalleCompraTexto = "";
    let seguirComprando = true;

    while (seguirComprando) {
        const idSeleccionado = seleccionarProductoDelCatalogo(
            catalogoObjetos,
            nombreCliente,
            subtotalBrutoAcumulado
        );

        if (idSeleccionado === 0) {
            seguirComprando = false;
        } else {
            const indiceObjeto = idSeleccionado - 1;
            const objetoProductoElegido = catalogoObjetos[indiceObjeto];

            if (!objetoProductoElegido.disponible || objetoProductoElegido.stock <= 0) {
                alert(`El producto "${objetoProductoElegido.nombre}" se encuentra agotado.`);
            } else {
                const cantidadComprar = solicitarCantidadParaObjeto(objetoProductoElegido);

                // Invocamos el método vender() de la instancia para descontar su stock real
                const ventaExitosa = objetoProductoElegido.vender(cantidadComprar);

                if (ventaExitosa) {
                    const subtotalLinea = calcularSubtotalLinea(objetoProductoElegido.precio, cantidadComprar);
                    subtotalBrutoAcumulado = Math.round((subtotalBrutoAcumulado + subtotalLinea) * 100) / 100;
                    cantidadTotalUnidades += cantidadComprar;
                    detalleCompraTexto +=
                        `- ${cantidadComprar}x ${objetoProductoElegido.nombre} ($${subtotalLinea} MXN | Stock restante en objeto: ${objetoProductoElegido.stock})\n`;

                    seguirComprando = confirm(
                        `✅ Se ejecutó producto.vender(${cantidadComprar}) en "${objetoProductoElegido.nombre}".\n` +
                        `Stock restante del objeto: ${objetoProductoElegido.stock} unidad(es).\n` +
                        `Subtotal acumulado: $${subtotalBrutoAcumulado} MXN.\n\n` +
                        "¿Deseas agregar otro producto a tu compra?"
                    );
                }
            }
        }
    }

    if (cantidadTotalUnidades === 0) {
        const mensajeSinCompra = `Gracias por visitar ${nombreTienda}, ${nombreCliente}. No se realizaron compras.`;
        console.log(mensajeSinCompra);
        alert(mensajeSinCompra);
        return;
    }

    // Solicitud opcional de cupón promocional (además del descuento por volumen)
    const respuestaCupon = prompt(
        `Llevas ${cantidadTotalUnidades} unidad(es) en tu carrito.\n` +
        "Si tienes un cupón promocional (TECH10 o GAMER15), ingrésalo o deja vacío:"
    );
    const codigoCupon = respuestaCupon !== null ? respuestaCupon : "";

    const montoDescuento = calcularDescuentoCotizacion(
        subtotalBrutoAcumulado,
        cantidadTotalUnidades,
        codigoCupon
    );
    const subtotalNeto = Math.round((subtotalBrutoAcumulado - montoDescuento) * 100) / 100;
    const montoIva = calcularMontoIva(subtotalNeto, tasaImpuestoIva);
    const costoEnvio = calcularCostoEnvio(subtotalNeto, minimoEnvioGratis, tarifaEnvioBase);
    const totalFinalPagar = Math.round((subtotalNeto + montoIva + costoEnvio) * 100) / 100;

    mostrarResumenFinal(
        nombreTienda,
        nombreCliente,
        catalogoObjetos,
        detalleCompraTexto,
        cantidadTotalUnidades,
        subtotalBrutoAcumulado,
        montoDescuento,
        subtotalNeto,
        montoIva,
        costoEnvio,
        totalFinalPagar
    );
}

// Invocación principal del simulador
iniciarSimuladorTiendaObjetos(
    NOMBRE_TIENDA_HARDWARE,
    catalogoProductosHardware,
    TASA_IVA_MEXICO,
    MONTO_MINIMO_ENVIO_GRATIS,
    TARIFA_ENVIO_ESTANDAR
);
