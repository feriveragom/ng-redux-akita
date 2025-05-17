# Requerimientos

## Install Tailwind CSS with Angular

https://tailwindcss.com/docs/installation/framework-guides/angular

```bash
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

## Posible estructura de directorio para un proyecto angular 19

/public/assets
/src
    /app
        <</requirement-name>>
            /components
                /shared
                /feature
            /services
            /interfaces
            /pipes
            /directives
            /mappers
            /pages        
        /store
            <</requirement-name>>
                /actions
                /reducers
                /selectors
                /effects
        app.component.html
        app.component.ts
        app.config.ts
        app.routes.ts
    /environments
    /i18n 
    index.html
    main.ts
    styles.css

### Descripción de Directorios

- **/public/assets**: Archivos estáticos como imágenes, fuentes e iconos. Angular 19 recomienda esta ubicación para mejor rendimiento y caching.

- **/src**: Directorio principal del código fuente.
  - **/app**: Contiene todos los componentes y lógica de la aplicación.
    - **/<</requirement-name>>**: Agrupa por funcionalidad/módulo, permitiendo una organización más escalable.
      - **/components**: Componentes específicos de esta funcionalidad.
        - **/shared**: Componentes reutilizables dentro de esta funcionalidad.
        - **/feature**: Componentes específicos que implementan features concretas.
      - **/services**: Servicios que manejan la lógica de negocio y comunicación con APIs para esta funcionalidad.
      - **/interfaces**: Tipos e interfaces TypeScript específicos para esta funcionalidad.
      - **/pipes**: Pipes personalizados para transformaciones de datos en plantillas.
      - **/directives**: Directivas que extienden el comportamiento de elementos HTML.
      - **/mappers**: Funciones para transformar datos entre diferentes formatos o estructuras.
      - **/pages**: Componentes de página que representan vistas completas.
    - **/store**: Gestión centralizada del estado de la aplicación.
      - **/<</requirement-name>>**: Separación del estado por funcionalidad.
        - **/actions**: Acciones que describen eventos en la aplicación.
        - **/reducers**: Funciones puras que procesan las acciones y actualizan el estado.
        - **/selectors**: Funciones para obtener datos específicos del estado.
        - **/effects**: Manejo de efectos secundarios como llamadas a APIs.
    - **app.component.html**: Plantilla del componente raíz.
    - **app.component.ts**: Componente raíz de la aplicación.
    - **app.config.ts**: Configuración de la aplicación (proveedores, configuración global).
    - **app.routes.ts**: Definición de rutas para la navegación.
  - **/environments**: Configuraciones específicas para diferentes entornos (desarrollo, producción).
  - **/i18n**: Archivos para internacionalización y traducción.
  - **index.html**: Página HTML principal que carga la aplicación.
  - **main.ts**: Punto de entrada de la aplicación donde se inicializa.
  - **styles.css**: Estilos globales, incluyendo la importación de Tailwind CSS.

Esta estructura sigue las mejores prácticas de Angular 19, organizando el código por funcionalidad y separando claramente las responsabilidades. La organización por características facilita el mantenimiento y la escalabilidad del proyecto.

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

## .


# --------------------REVISAR DESDE AQUI
# Conceptos Clave de Angular 19

## Componentes y Plantillas
- Standalone Components (recomendado, reemplaza a NgModules, por defecto en Angular 19)
- Directivas de control modernas (@if, @for, @switch, @empty)
- Componentes clásicos con módulos (legacy)
- Property Binding, Event Binding, Two-way Binding
- input / output para comunicación entre componentes (en minúsculas desde Angular 14+)
- Proyección de contenido (ng-content)
- ViewChild / ContentChild
- HostListener / HostBinding
- Pipes (async, date, etc.)

## Estado y Reactividad
- Signals (nuevo sistema reactivo recomendado)
- computed() para derivar estados
- effect() para efectos secundarios
- toSignal() / toObservable() para interoperar con RxJS
- RxJS (Observables, Subjects)
- Change Detection (Default y OnPush)
- Zoneless Applications (activado por defecto en Angular 19, mejor rendimiento)

## Routing y Navegación
- Rutas con loadComponent (para Standalone)
- Lazy Loading de componentes
- Guards funcionales (reemplaza a CanActivate)
- Resolvers funcionales
- Parámetros de ruta y queryParams
- Router Events

## Servicios y DI
- Inyección de dependencias
- Servicios Singleton (@Injectable)
- Inyección con inject() function (alternativa moderna a constructor)
- Tokens de inyección (InjectionToken)
- Providers y ámbitos de inyección
- Multi-providers

## HTTP y Comunicación
- HttpClient
- Interceptores HTTP
- Comunicación con API REST
- Manejo de errores HTTP
- HttpContext

## Forms
- Reactive Forms (recomendado)
- FormControl, FormGroup, FormArray
- FormBuilder
- Validación de formularios
- Template-driven Forms (legacy)

## Estilos y CSS
- Component Styles
- Shadow DOM y ViewEncapsulation
- ::ng-deep (para sobrescribir estilos)
- Host Context
- Tailwind CSS (integración)

## Optimización
- Signal-based Change Detection
- Pure Pipes
- trackBy para listas (@for ... track item.id)
- Lazy Loading
- OnPush Change Detection

## Testing
- TestBed
- Component Testing
- Service Testing
- Mocks y Spies
- Harness para Testing

## Funcionalidades Avanzadas
- Directivas personalizadas
- Content Projection
- Dynamic Components
- Animaciones
- Internacionalización (i18n)

## Server-Side Rendering
- Angular Universal
- Hydration
- Meta tags para SEO

## Herramientas y Ecosistema
- Angular CLI
- ESLint
- Angular DevTools
- Tooling para VSCode
- Angular Compiler (AOT)

## Bibliotecas Comunes
- Angular Material (componentes UI)
- NgRx (alternativa a Signals para gestión de estado compleja)
- Akita (alternativa más ligera para gestión de estado)
- RxAngular (rendimiento avanzado)
- TanStack Query (gestión de datos del servidor)

## Novedades en Angular 17-19
- Nuevas directivas de control (@if, @for, @switch)
- Signals como sistema de reactividad de primera clase
- Aplicaciones sin Zone.js (zoneless)
- @angular/ssr para Server-Side Rendering mejorado
- Deferrable Views (@defer)
- Mejoras en Developer Experience (DX)
- Nueva documentación en angular.dev
- Soporte para Server Actions
- Signals para Forms (SignalForm)