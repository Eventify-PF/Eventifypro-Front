

export const formatearFecha = fecha => {
    const partesFecha = fecha.split('-');
    const año = parseInt(partesFecha[0], 10);
    const mes = parseInt(partesFecha[1], 10);
    const dia = parseInt(partesFecha[2], 10);
    

    const fechaNueva = new Date(año, mes - 1, dia); 
    const opciones = {
        day: '2-digit',
        month: 'long',
        year: 'numeric' 
    };
    const formatoLocal = fechaNueva.toLocaleDateString('es-ES', opciones);

    return formatoLocal;
}