import { map } from 'lodash';
import './style.css';

class ThemesDemoApp {
  constructor() {
    this.selectedDevice = null;

    this.options = {
      url: window.KW_DEMO_CONFIG.themeUrl || '',
      container: window.KW_DEMO_CONFIG.container || '#kk-demo-app',
      qrcode: window.KW_DEMO_CONFIG.qrcode || '',
      devices: window.KW_DEMO_CONFIG.devices || {
        mobile_small: {
          name: 'Mobile Small',
          size: [ 320, 480 ],
          menuClass: 'kk-mobile',
          gaCategory: 'preview-change',
          gaAction: 'click',
          gaLabel: 'Mobile Small',
        },
        mobile_small_landscape: {
          name: 'Mobile Small Landscape',
          size: [ 480, 320 ],
          menuClass: 'kk-mobile-landscape',
          gaCategory: 'preview-change',
          gaAction: 'click',
          gaLabel: 'Mobile Small Landscape',
        },
        mobile: {
          name: 'Mobile',
          size: [ 375, 667 ],
          menuClass: 'kk-mobile',
          gaCategory: 'preview-change',
          gaAction: 'click',
          gaLabel: 'Mobile',
        },
        mobile_landscape: {
          name: 'Mobile Landscape',
          size: [ 667, 375 ],
          menuClass: 'kk-mobile-landscape',
          gaCategory: 'preview-change',
          gaAction: 'click',
          gaLabel: 'Mobile Landscape',
        },
        tablet: {
          name: 'Tablet',
          size: [ 768, 1024 ],
          menuClass: 'kk-tablet',
          gaCategory: 'preview-change',
          gaAction: 'click',
          gaLabel: 'Tablet',
        },
        tablet_landscape: {
          name: 'Tablet Landscape',
          size: [ 1024, 768 ],
          menuClass: 'kk-tablet-landscape',
          gaCategory: 'preview-change',
          gaAction: 'click',
          gaLabel: 'Tablet Landscape',
        },
      },
      themes: window.KW_DEMO_CONFIG.themes || [],
    };

    this.selectDevice('mobile_small');
  }

  bindEvents() {
    const menuLink = document.querySelectorAll(this.options.container + ' a');

    for (var i = 0; i < menuLink.length; i++) {
      menuLink[ i ].addEventListener('click', (event) => {
        const button = event.target;
        this.onMenuClick(button);

        event.preventDefault();
      });
    }

    if (this.options.themes && !!this.options.themes.length) {
      document.getElementById('kk-demo-theme-change').
          addEventListener('change', (event) => {
            const slug = event.target.value;
            const frame = document.getElementById('kk-demo-frame');
            const theme = frame.contentWindow.document.getElementById(
                'theme-style');

            if (!slug) {
              theme.href = null;
              return false;
            }

            theme.href = `assets/themes/${event.target.value}/style.css`;
          });
    }

    document.getElementById('kk-demo-load-template').
      addEventListener('click', (event) => {
        const frame = document.getElementById('kk-demo-frame');
        frame.src = this.options.url;

        document.getElementById('kk-demo-load-template').remove();
      });
  }

  onMenuClick(button) {
    const { device } = button.dataset;

    this.selectedDevice = device;

    this.changeSize();
  }

  selectDevice(device) {
    this.selectedDevice = device;
    this.refreshView();
    this.bindEvents();
  }

  changeSize() {
    const frame = document.querySelector(this.options.container + ' iframe');

    frame.style.width = this.options.devices[ this.selectedDevice ].size[ 0 ] +
        'px';
    frame.style.height = this.options.devices[ this.selectedDevice ].size[ 1 ] +
        'px';

    this.selectMenu();
  }

  refreshView() {
    console.log('--> this.options.container: ', this.options.container,
        document.querySelector(this.options.container));
    document.querySelector(
        this.options.container).innerHTML = this.insertTemplate();

    this.selectMenu();
  }

  selectMenu() {
    const menuLinks = document.querySelectorAll(
        this.options.container + ' .kk-menu a');

    map(menuLinks, (link) => {
      link.classList.remove('active');
    });

    const selected = document.querySelector(
        this.options.container + ' .kk-menu a[data-device="' +
        this.selectedDevice + '"]');

    selected.classList.add('active');
  }

  insertTemplate() {
    console.log('--> this.selectedDevice: ', this.selectedDevice);
    console.log('--> options: ', this.options.devices[ this.selectedDevice ]);

    if (!this.selectedDevice) {
      return (`<div>Loading...</div>`);
    }

    return (`
            <div class="kk-menu">
                ${this.insertMenu()}
            </div>
            <div class="kk-iframe">
                ${this.insertIframe()}     
            </div>
        `);
  }

  insertThemeChoose() {
    if (!this.options.themes || !this.options.themes.length) {
      return ('');
    }

    const labelText = `<span>Select theme:</span>`;
    const options = map(this.options.themes, (theme) => {
      return (`<option value="${theme.slug}">${theme.name}</option>`);
    }).join('');

    return (`${labelText} <select id="kk-demo-theme-change">${options}</select>`);
  }

  insertMenu() {
    const links = map(this.options.devices, (device, key) => {
      return (`
        <li>
          <a
            href="#"
            data-device="${key}"
            class="${device.menuClass}"
            data-vars-ga-category="${device.gaCategory}"
            data-vars-ga-action="${device.gaAction}"
            data-vars-ga-label="${device.gaLabel}"
          >${device.name}</a>
        </li>
      `);
    }).join('');

    return (`
            <div class="kk-menu">
                <span>Select device: </span>
                <ul>${links}</ul>
                ${this.insertThemeChoose()}
            </div>
        `);
  }

  insertQRcode() {
    return (`
            <div class="kk-qrcode">
                <div>Check on your phone!</div>
                <img src="${this.options.qrcode}">
            </div>
        `);
  }

  insertIframe() {
    return (`
            <div class="kk-device">
                <button id="kk-demo-load-template" class="kk-demo-button">Load the template</button>
                ${this.options.qrcode ? this.insertQRcode() : ''}
                <iframe
                    id="kk-demo-frame"
                    src=""
                    frameborder="0"
                    style="width: ${this.options.devices[ this.selectedDevice ].size[ 0 ]}px; height: ${this.options.devices[ this.selectedDevice ].size[ 1 ]}px;"
                ></iframe>
            </div>
        `);
  }
}

new ThemesDemoApp();
