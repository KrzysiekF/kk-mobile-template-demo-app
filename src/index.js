import { map } from 'lodash';
import './style.css';

class ThemesDemoApp {
    constructor() {
        this.selectedDevice = null;

        this.options = {
            url: 'http://themes.krzysztof-furtak.pl/themes/malpha2/malpha2/',
            container: '#kk-demo-app',
            devices: {
                mobile_small: {
                    name: 'Mobile Small',
                    size: [320, 480],
                    menuClass: 'kk-mobile'
                },
                mobile_small_landscape: {
                    name: 'Mobile Small Landscape',
                    size: [480, 320],
                    menuClass: 'kk-mobile-landscape'
                },
                mobile: {
                    name: 'Mobile',
                    size: [375, 667],
                    menuClass: 'kk-mobile'
                },
                mobile_landscape: {
                    name: 'Mobile Landscape',
                    size: [667, 375],
                    menuClass: 'kk-mobile-landscape'
                },
                tablet: {
                    name: 'Tablet',
                    size: [768, 1024],
                    menuClass: 'kk-tablet'
                },
                tablet_landscape: {
                    name: 'Tablet Landscape',
                    size: [1024, 768],
                    menuClass: 'kk-tablet-landscape'
                }
            }
        };

        this.selectDevice('mobile_small');
    }

    bindEvents() {
        const menuLink = document.querySelectorAll(this.options.container + ' a');

        for (var i = 0; i < menuLink.length; i++) {
            menuLink[i].addEventListener('click', (event) => {
                const button = event.target;
                this.onMenuClick(button);

                event.preventDefault();
            });
        }
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

        frame.style.width = this.options.devices[this.selectedDevice].size[0] + 'px';
        frame.style.height = this.options.devices[this.selectedDevice].size[1] + 'px';
    }

    refreshView() {
        console.log('--> this.options.container: ', this.options.container, document.querySelector(this.options.container));
        document.querySelector(this.options.container).innerHTML = this.insertTemplate();
    }

    insertTemplate() {
        console.log('--> this.selectedDevice: ', this.selectedDevice);
        console.log('--> options: ', this.options.devices[this.selectedDevice]);

        if (!this.selectedDevice) {
            return (`<div>Loading...</div>`);
        }

        return (`
            <div class="kk=menu">
                ${this.insertMenu()}
            </div>
            <div class="kk-iframe">
                ${this.insertIframe()}     
            </div>
        `);
    }

    insertMenu() {
        const links = map(this.options.devices, (device, key) => {
                return (`<li><a href="#" data-device="${key}" class="${device.menuClass}">${device.name}</a></li>`);
            }).join('');

        return (`<div class="kk-menu"><ul>${links}</ul></div>`);
    }

    insertIframe() {
        return (`
            <div class="kk-bg">
                <iframe 
                    src="${this.options.url}"
                    frameborder="0"
                    style="width: ${this.options.devices[this.selectedDevice].size[0]}px; height: ${this.options.devices[this.selectedDevice].size[1]}px;"
                ></iframe>
            </div>
        `);
    }
}

new ThemesDemoApp();
