export const validarRuta = (rutaa, viajes) => {
    const viajeBuscado = viajes.filter(
      ({ ruta }) => ruta.id === rutaa.id
    );
    if (viajeBuscado.length !== 0) {
      return false;
    }
    return true;
  };