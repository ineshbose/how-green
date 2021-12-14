<div align="center">
    <p align="center">
        <img alt="How Green logo" src="assets/logo.svg" height="250px">
        <h3 align="center">How Green?</h3>
        <a href="https://how-green.herokuapp.com" target="_blank"><img alt="GitHub deployments" src="https://img.shields.io/github/deployments/ineshbose/how-green/how-green?style=flat-square"></a>
        <a href="https://github.com/ineshbose/how-green/actions/workflows/test-vue.yml" target="_blank"><img alt="GitHub Workflow Status" src="https://img.shields.io/github/workflow/status/ineshbose/how-green/Test%20frontend?style=flat-square&label=frontend"></a>
        <a href="https://github.com/ineshbose/how-green/actions/workflows/test-api.yml" target="_blank"><img alt="GitHub Workflow Status" src="https://img.shields.io/github/workflow/status/ineshbose/how-green/Test%20backend?style=flat-square&label=backend"></a>
    </p>
</div>

How Green? is an application, created for the Human Computer Interaction (H) Coursework, aiming to provide awareness about green shopping.

## Getting Started

### Prerequisites

#### Cloning this Repository

To clone this repository, you need to have [Git](https://git-scm.com/) installed, however you can also download a [ZIP](https://github.com/ineshbose/how-green/archive/master.zip) instead.

```sh
$ git clone https://github.com/ineshbose/how-green.git
$ cd how-green
```

#### Node.js & NPM/Yarn

This project uses two Node.js frameworks, and in order to run those, you need to have [Node.js](https://nodejs.org/en/download/) installed which will include `npm`. Furthermore, it is **strongly recommended** to install [Yarn](https://classic.yarnpkg.com/lang/en/); issues with `npm` are not to blamed here.

```sh
$ npm install --global yarn
# Make sure npm bin is in your PATH, eg (C:\User\...\AppData\Roaming\npm)
```

#### Python & PIP

You should have [Python 3](https://www.python.org/downloads/) already installed that also uses the package manager `pip`.

```sh
$ python --version  # or python3 --version
$ pip --version     # or pip3 --version or python -m pip --version
```

##### Virtual Environment

It is good practice that you create a virtual environment before hand to install packages and get the project running.

```sh
$ python -m venv env        # name env
$ source env/bin/activate   # or env\scripts\activate.bat on Windows
```

### Frontend

```sh
$ yarn              # or npm install
$ yarn run serve    # or npm run serve
```

### Backend

```sh
$ pip install -r requirements-dev.txt
$ python run.py
```

### Extension

```sh
$ cd extension
$ yarn              # or npm install
$ yarn run start    # or npm run start
```

The extension will be in `dist/` with `manifest.json` that can be added to your browser.

### `launch.json` (convenient option)*

```json
{
    "configurations": [
        {
            "name": "how-green-backend",
            "type": "python",
            "request": "launch",
            "program": "${workspaceFolder}/run.py"
        },
        {
            "name": "how-green-frontend",
            "type": "node",
            "request": "launch",
            "runtimeExecutable": "yarn",
            "cwd": "${workspaceFolder}",
            "runtimeArgs": [
                "serve"
            ],
            "skipFiles": [
                "<node_internals>/**"
            ]
        },
        {
            "name": "how-green-extension",
            "type": "node",
            "request": "launch",
            "runtimeExecutable": "yarn",
            "cwd": "${workspaceFolder}/extension",
            "runtimeArgs": [
                "start"
            ],
            "skipFiles": [
                "<node_internals>/**"
            ]
        }
    ],
    "compounds": [
        {
            "name": "How Green",
            "configurations": [
                "how-green-backend",
                "how-green-frontend",
                "how-green-extension"
            ]
        }
    ]
}
```

### Dev References

* [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
* [Chrome Developers](https://developer.chrome.com/docs/extensions/mv3/getstarted/)
* [`flask-vuejs-template`](https://github.com/gtalarico/flask-vuejs-template)
* [`react-typescript-chrome-extension-boilerplate`](https://github.com/sivertschou/react-typescript-chrome-extension-boilerplate)

## Developed With

- [Flask](https://flask.palletsprojects.com/en/2.0.x/)
- [Flask-RESTX](https://flask-restx.readthedocs.io/en/latest/)
- [React](https://reactjs.org/)
- [React-Bootstrap](https://react-bootstrap.github.io/)
- [Vue](https://vuejs.org/)
- [BootstrapVue](https://bootstrap-vue.org/)
- [Chart.js](https://www.chartjs.org/)

## Team Members

- Anna Berry
- Hector Jones
- Inesh Bose
- Marc Auf der Heyde
- Stephen Connolly

## Screenshots

### Extension

<table>
<tbody>
<tr>
    <td>
        <img src="assets/final/product_page_with_score.png" alt="Extension showing score" />
    </td>
    <td>
        <img src="assets/final/product_page_with_alternatives_hwindow.png" alt="Extension showing alternatives" />
    </td>
</tr>
<tr>
    <td>
        <img src="assets/final/extension_tooltips.png" alt="Extension with text on tooltips due to limited space" />
    </td>
    <td>
        <img src="assets/final/extension_loading.png" alt="Extension in loading state" />
    </td>
</tr>
<tr>
    <td colspan="2">
        <div align="center">
            <p align="center">
                <img src="assets/final/extension_homepage.png" alt="Extension on non-tesco page" />
            </p>
        </div>
    </td>
</tr>
</tbody>
</table>

### Frontend

<table>
<tbody>
<tr>
    <td>
        <img src="assets/final/product_score_view_more.png" alt="Product score" />
    </td>
    <td>
        <img src="assets/final/product_alternatives_view_more_hwindow.png" alt="Product alternatives" />
    </td>
</tr>
<tr>
    <td>
        <img src="assets/final/visualisations_1.png" alt="Product visualisations (1/2)" />
    </td>
    <td>
        <img src="assets/final/visualisations_2.png" alt="Product visualisations (2/2)" />
    </td>
</tr>
<tr>
    <td>
        <img src="assets/final/landing_page.png" alt="Home page" />
    </td>
    <td>
        <img src="assets/final/product_page_loading_tablet.png" alt="Loading state" />
    </td>
</tr>
</tbody>
</table>
