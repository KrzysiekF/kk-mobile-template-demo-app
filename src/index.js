import { map } from 'lodash';
import './style.css';

class ThemesDemoApp {
    constructor() {
        this.selectedDevice = null;

        this.options = {
            defaultSelectedDevice: 
                (window.KW_DEMO_CONFIG.defaultSelectedDevice && window.KW_DEMO_CONFIG.fullscreen)
                ? window.KW_DEMO_CONFIG.defaultSelectedDevice 
                : 'mobile_small',

            fullscreen: window.KW_DEMO_CONFIG.fullscreen || false,

            backURL: window.KW_DEMO_CONFIG.backURL || false,
            logoURL: window.KW_DEMO_CONFIG.logoURL || false,
            logoImg: window.KW_DEMO_CONFIG.logoImg || false,
            ctaURL: window.KW_DEMO_CONFIG.ctaURL || false,
            ctaText: window.KW_DEMO_CONFIG.ctaText || false,

            url: window.KW_DEMO_CONFIG.themeUrl || '',
            container: window.KW_DEMO_CONFIG.container || '#kk-demo-app',
            qrcode: window.KW_DEMO_CONFIG.qrcode || '',
            devices: window.KW_DEMO_CONFIG.devices || {
                mobile_small: {
                    name: 'Mobile Small',
                    size: [320, 480],
                    menuClass: 'kk-mobile',
                    gaCategory: 'preview-change',
                    gaAction: 'click',
                    gaLabel: 'Mobile Small',
                },
                mobile_small_landscape: {
                    name: 'Mobile Small Landscape',
                    size: [480, 320],
                    menuClass: 'kk-mobile-landscape',
                    gaCategory: 'preview-change',
                    gaAction: 'click',
                    gaLabel: 'Mobile Small Landscape',
                },
                mobile: {
                    name: 'Mobile',
                    size: [375, 667],
                    menuClass: 'kk-mobile',
                    gaCategory: 'preview-change',
                    gaAction: 'click',
                    gaLabel: 'Mobile',
                },
                mobile_landscape: {
                    name: 'Mobile Landscape',
                    size: [667, 375],
                    menuClass: 'kk-mobile-landscape',
                    gaCategory: 'preview-change',
                    gaAction: 'click',
                    gaLabel: 'Mobile Landscape',
                },
                tablet: {
                    name: 'Tablet',
                    size: [768, 1024],
                    menuClass: 'kk-tablet',
                    gaCategory: 'preview-change',
                    gaAction: 'click',
                    gaLabel: 'Tablet',
                },
                tablet_landscape: {
                    name: 'Tablet Landscape',
                    size: [1024, 768],
                    menuClass: 'kk-tablet-landscape',
                    gaCategory: 'preview-change',
                    gaAction: 'click',
                    gaLabel: 'Tablet Landscape',
                },
            },
            themes: window.KW_DEMO_CONFIG.themes || [],
        };

        this.selectDevice(this.options.defaultSelectedDevice);
        this.changeSize();
    }

    bindEvents() {
        const menuLink = document.querySelectorAll('.kk-demo__devices-select a');

        for (var i = 0; i < menuLink.length; i++) {
            const button = menuLink[i];

            button.addEventListener('click', () => {
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

        // document.getElementById('kk-demo-load-template').
        // addEventListener('click', (event) => {
        const frame = document.getElementById('kk-demo-frame');
        frame.src = this.options.url;

        // document.getElementById('kk-demo-load-template').remove();
        // });
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
        const frame = document.querySelector('#kk-demo-frame');

        if (this.selectedDevice === 'desktop') {
            document.querySelector('.kk-demo__device').classList.remove('kk-demo__device--phone');

            frame.style.width = '100vw';
            frame.style.height = '100vh';
        } else {
            document.querySelector('.kk-demo__device').classList.add('kk-demo__device--phone');

            frame.style.width = this.options.devices[this.selectedDevice].size[0] + 'px';
            frame.style.height = this.options.devices[this.selectedDevice].size[1] + 'px';
        }

        this.selectMenu();
    }

    refreshView() {
        const container = document.querySelector(this.options.container);

        container.innerHTML = this.render();
        this.selectMenu();
    }

    selectMenu() {
        const menuLinks = document.querySelectorAll(
            this.options.container + ' .kk-demo__header a');

        console.log(this.selectedDevice);

        map(menuLinks, (link) => {
            link.classList.remove('active');
        });

        const selected = document.querySelector(
            this.options.container + ' .kk-demo__header a[data-device="' +
            this.selectedDevice + '"]');

        selected.classList.add('active');
    }

    render() {
        const { fullscreen } = this.options;

        if (!this.selectedDevice) {
            return (`<div>Loading...</div>`);
        }

        return (`
            <div class="kk-demo__container ${fullscreen ? 'fullscreen' : ''}">
                <div class="kk-demo__header">
                    ${fullscreen ? this.renderFullHeader() : this.renderMenu()}
                </div>
                <div class="kk-demo__iframe-container">
                    ${this.renderIframe()}     
                </div>
            </div>
        `);
    }

    renderFullHeader() {
        const { backURL, logoImg, logoURL, ctaURL, ctaText } = this.options;

        return (`
            <div class="kk-demo__header-bar">
                <div class="kk-demo__header-bar--back kk-demo__button-box">
                    ${backURL ? (`
                        <a href="${backURL}">
                            <span>
                                <svg viewBox="0 0 32 32" width="1em" height="1em">
                                    <path 
                                        d="M12.586 27.414l-10-10a2 2 0 0 1 0-2.828l10-10a2 2 0 1 1 
                                        2.828 2.828L8.828 14H28a2 2 0 1 1 0 4H8.828l6.586 6.586c.39.39.586.902.586 
                                        1.414s-.195 1.024-.586 1.414a2 2 0 0 1-2.828 0z" 
                                    />
                                </svg>
                            </span>
                        </a>
                    `) : ''}
                </div>
                <div class="kk-demo__header-bar--logo">
                    ${logoImg ? (`
                        <a href="${logoURL || '/'}">
                            <img src="${logoImg}" alt="Website Logo" />
                        </a>
                    `) : ''}
                </div>
                <div class="kk-demo__header-bar--menu">
                    ${this.renderMenu()}
                </div>
                <div class="kk-demo__header-bar--button kk-demo__button-box">
                    ${ctaURL ? (`
                        <a href="${ctaURL}" class="primary">
                            <span>
                                ${ctaText}
                            </span>
                        </a>
                    `) : ''}
                </div>
            </div>
        `);
    }

    renderMenu() {
        const links = map(this.options.devices, (device, key) => {
            let icon = '';

            switch (key) {
                case 'mobile_small':
                    icon = `
                        <svg viewBox="0 0 32 32">
                            <path d="M23 0h-14c-1.65 0-3 1.35-3 3v26c0 1.65 1.35 3 3 3h14c1.65 0 3-1.35 3-3v-26c0-1.65-1.35-3-3-3zM12 1.5h8v1h-8v-1zM16 30c-1.105 0-2-0.895-2-2s0.895-2 2-2 2 0.895 2 2-0.895 2-2 2zM24 24h-16v-20h16v20z"></path>
                        </svg>
                    `;
                    break;
            
                case 'mobile':
                    icon = `
                        <svg viewBox="0 0 32 32">
                            <path d="M24 0h-18c-1.1 0-2 0.9-2 2v28c0 1.1 0.9 2 2 2h18c1.1 0 2-0.9 2-2v-28c0-1.1-0.9-2-2-2zM15 30.556c-0.859 0-1.556-0.697-1.556-1.556s0.697-1.556 1.556-1.556 1.556 0.697 1.556 1.556-0.697 1.556-1.556 1.556zM24 26h-18v-22h18v22z"></path>
                        </svg>
                    `;
                    break;

                case 'tablet':
                    icon = `
                        <svg viewBox="0 0 32 32">
                            <path d="M25 0h-20c-1.65 0-3 1.35-3 3v26c0 1.65 1.35 3 3 3h20c1.65 0 3-1.35 3-3v-26c0-1.65-1.35-3-3-3zM15 31c-0.552 0-1-0.448-1-1s0.448-1 1-1 1 0.448 1 1-0.448 1-1 1zM24 28h-18v-24h18v24z"></path>
                        </svg>
                    `;
                    break;

                default:
                    break;
            }

            return key === 'desktop' && !this.options.fullscreen ? null : (`
                <li>
                    <a
                        href="#"
                        data-device="${key}"
                        class="kk-demo__button ${device.menuClass}"
                        data-vars-ga-category="${device.gaCategory}"
                        data-vars-ga-action="${device.gaAction}"
                        data-vars-ga-label="${device.gaLabel}"
                    >
                        ${icon} <span>${device.name}</span>
                    </a>
                </li>
            `);
        }).join('');

        return (`
            <span>Select device: </span>
            <ul class="kk-demo__devices-select">${links}</ul>
            ${this.renderThemeChoose()}
        `);
    }

    renderQRcode() {
        return (`
            <div class="kk-demo__qrcode">
                <div>Check on your phone!</div>
                <img src="${this.options.qrcode}">
            </div>
        `);
    }

    renderIframe() {
        return (`
            <div class="kk-demo__device">
                ${this.options.qrcode ? this.renderQRcode() : ''}
                <iframe
                    id="kk-demo-frame"
                    src=""
                    frameborder="0"
                ></iframe>
            </div>
        `);
    }

    renderThemeChoose() {
        if (!this.options.themes || !this.options.themes.length) {
            return ('');
        }

        const labelText = `<span>Select theme:</span>`;
        const options = map(this.options.themes, (theme) => {
            return (`<option value="${theme.slug}">${theme.name}</option>`);
        }).join('');

        return (`${labelText} <select id="kk-demo-theme-change">${options}</select>`);
    }
};

new ThemesDemoApp();
