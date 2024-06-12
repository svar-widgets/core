# WX Core

## Usage

```
<script>
import { Button }  from '@wx/svelte-core';
</script>

<Button>Click me</Button>
```

## Cli commands

### Build

-   `yarn dev` - start project in dev mode, rebuild on change
-   `yarn build` - build production ready js file

the dev server will start at http://localhost:5000/tests.html

### Tests

#### Run tests

```
yarn dev:tests
cypress run -P ./ --config "baseUrl=http://localhost:5000"
```

#### Open Cypress console

```
yarn dev:tests
cypress open -P ./ --config "baseUrl=http://localhost:5000"
```

dev:tests command will start dev server at http://localhost:5000/tests.html
