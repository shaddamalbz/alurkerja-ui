# Alurkera UI

## Run Locally

Clone the project

```bash
  git clone https://gitlab.javan.co.id/alurkerja/alurkerja-ui.git
  cd alurkerja-ui
  yarn
```

Start the server

```bash
  yarn storybook
```

### Deploy

```bash
  yarn build-storybook
```

#### Publish

to help switching npmjs account use [npm-user-switch](https://github.com/perry-mitchell/npm-user-switch)

build first

```bash
  yarn build
```

Update version patch (0.0.x)

```bash
  yarn publish --patch
```

Update version minor (0.x.0)

```bash
  yarn publish --minor
```

Update version major (x.0.0)

```bash
  yarn publish --major
```
