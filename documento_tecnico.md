# Requerimientos

## Install Tailwind CSS with Angular

https://tailwindcss.com/docs/installation/framework-guides/angular

```bash
cd <<console reference>>

ng new <<my-project>> --style css

cd <<my-project>>

npm install tailwindcss @tailwindcss/postcss postcss --force
```

.postcssrc.json
```ts
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

styles.css
```css
@import "tailwindcss";
```

```bash
ng serve -o
```

app.component.html
```html
<h1 class="text-3xl font-bold underline">
  Hello world!
</h1>
```

## https://opensource.salesforce.com/akita/docs/installation

### Actualizar tslib a la versión que @datorama/akita requiere
```bash
npm install tslib@2.4.1
```

### Instalar Akita
```bash
npm install @datorama/akita
```

### Configurar automáticamente tu proyecto Angular para usar Akita
```bash
ng add @datorama/akita
```

### Formas del estado con AKITA

1. **Store**:
   - **Uso**: Se utiliza para gestionar el estado de una única entidad o un conjunto de datos que no se organiza en forma de colección.
   - **Importación**: `import { Store, StoreConfig } from '@datorama/akita';`
   - **Ejemplo**: Ideal para estados simples, como la configuración de la aplicación o la sesión de usuario.
   - **Ventajas**: Simplicidad y facilidad de uso para estados no complejos.

2. **EntityStore**:
   - **Uso**: Diseñado para gestionar colecciones de entidades, similar a una tabla en una base de datos.
   - **Importación**: `import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';`
   - **Ejemplo**: Ideal para manejar listas de elementos, como usuarios o productos.
   - **Ventajas**: Proporciona funcionalidades adicionales para gestionar múltiples elementos, como agregar, actualizar, o eliminar entidades.

Estas dos formas permiten gestionar el estado de manera eficiente según las necesidades específicas de tu aplicación. `Store` es adecuado para estados simples, mientras que `EntityStore` es ideal para colecciones de datos más complejas.

### Propuesta de Estructura de Directorio deun Proyecto Angular + AKITA

```tree
/
├── public/
│   └── assets/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── shared/
│   │   │   │   └── header/
│   │   │   │       ├── header.component.html
│   │   │   │       └── header.component.ts
│   │   │   └── feature/
│   │   ├── pages/
│   │   │   ├── home/
│   │   │   |   ├── home.component.html
│   │   │   |   └── home.component.ts
|   |   |   ├── user/
|   |   |   |   ├── user.component.html
│   │   │   |   └── user.component.ts //-> AKITA USE
│   │   ├── store/            //----> AKITA CONFIG
│   │   │   └── user/         // <<requirement-name>>/
│   │   │       ├── user.query.ts
│   │   │       ├── user.state.ts
│   │   │       ├── user.service.ts
│   │   │       └── user.store.ts
│   │   ├── interfaces/
│   │   ├── pipes/
│   │   ├── directives/
│   │   ├── mappers/
│   │   ├── app.component.html
│   │   ├── app.component.ts
│   │   ├── app.config.ts  //----> AKITA PROVIDERS
│   │   └── app.routes.ts
│   ├── environments/
│   └── styles.css
└── .postcssrc.json
```

## Tips

### - Los archivos estaticos se ponen en /public, ejemplo /public/assets en Angular 19

### - Para no poner banderas en los comandos de la angular cli actualizar el schematics
angular.json
```json
{
  "projects": {
    "<<my-project>>": {
      "schematics": {
        "@schematics/angular:component": {
          "style": "css",
          "skipTests": true,
          "inlineTemplate": false,
          "inlineStyle": true
        },
        "@schematics/angular:class": {
          "skipTests": true
        },
        "@schematics/angular:directive": {
          "skipTests": true
        },
        "@schematics/angular:guard": {
          "skipTests": true
        },
        "@schematics/angular:interceptor": {
          "skipTests": true
        },
        "@schematics/angular:pipe": {
          "skipTests": true
        },
        "@schematics/angular:resolver": {
          "skipTests": true
        },
        "@schematics/angular:service": {
          "skipTests": true
        }
      }
    }
  }
}
```

#### Notas sobre la configuración de schematics:

- **Propósito general**: Esta configuración establece valores predeterminados para los comandos de generación de Angular CLI, eliminando la necesidad de especificar flags repetitivamente.

- **skipTests: true**: Se aplica a todos los tipos de artefactos para omitir la generación de archivos de prueba (.spec.ts). Esto agiliza el desarrollo inicial, pero considera habilitarlo en proyectos de producción donde las pruebas sean críticas.

- **Componentes**:
  - `style: "css"`: Establece CSS como formato de estilo predeterminado, compatible con Tailwind CSS.
  - `inlineTemplate: false`: Mantiene el HTML en archivos separados para mejor legibilidad.
  - `inlineStyle: true`: Incluye los estilos CSS dentro del archivo .ts del componente, reduciendo el número de archivos.

### - Actualizar configuracion para alias para evitar importaciones raras
tsconfig.json
```json
{
  "compilerOptions": {
    "paths": {
      "@environments/*": ["src/environments/*"]
    }
  }
}
```

*.service.ts
```ts
import { environment } from 'src/environments/environment';
```

### - angular/cli
	g es equivalente a generate
	c es equivalente a component
	s es equivalente a service
	d es equivalente a directive
	p es equivalente a pipe
	m es equivalente a module
	e es equivalente a enum

	-t es equivalente a --inline-template
	-s es equivalente a --inline-style
	
ng g c app/pages/<<page-name>> -s --skip-tests
ng g s app/services/<<service-name>> -s --skip-tests
ng g environments

### - Rutas con HashLocationStrategy
El HashLocationStrategy es una estrategia de navegación que añade un símbolo hash (#) a las URLs de tu aplicación Angular. Por ejemplo, en lugar de tener rutas como https://miapp.com/usuarios, tendrías https://miapp.com/#/usuarios.

```ts
import { HashLocationStrategy, LocationStrategy } from '@angular/common'
  // HashStrategy
  {
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }
```

## Markdown
```bash
npm install ngx-markdown marked prismjs
```

## .


