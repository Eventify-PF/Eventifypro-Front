// MyComponent.js

import { useEffect } from 'react';

function MyComponent() {
  useEffect(() => {
    // Verifica si estamos en un entorno de navegador antes de usar location
    if (typeof window !== 'undefined') {
      const currentLocation = window.location;
      // Ahora puedes usar currentLocation de manera segura
    }
  }, []);

  return <div>Contenido de mi componente</div>;
}

export default MyComponent;
