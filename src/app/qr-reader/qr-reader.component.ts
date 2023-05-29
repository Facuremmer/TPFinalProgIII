import {Component, ViewChild, ViewEncapsulation, OnInit} from '@angular/core';

import {QrScannerComponent} from 'angular2-qrscanner';

@Component({
  selector: 'app-qr-reader',
  templateUrl: './qr-reader.component.html',
  styleUrls: ['./qr-reader.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class QrReaderComponent implements OnInit {

  @ViewChild(QrScannerComponent, { static: false })
  qrScannerComponent!: QrScannerComponent;

  qrResult: any;
 
  ngOnInit() {}

  ngAfterViewInit(): void {
      this.newQR();
  }

 newQR(): void {
    this.qrScannerComponent.getMediaDevices().then(devices => {
        console.log(devices);
        const videoDevices: MediaDeviceInfo[] = [];
        for (const device of devices) {
            if (device.kind.toString() === 'videoinput') {
                videoDevices.push(device);
            }
        }
        if (videoDevices.length > 0){
            let choosenDev;
            for (const dev of videoDevices){
                if (dev.label.includes('front')){
                    choosenDev = dev;
                    break;
                }
            }
            if (choosenDev) {
                this.qrScannerComponent.chooseCamera.next(choosenDev);
            } else {
                this.qrScannerComponent.chooseCamera.next(videoDevices[1]);
            }
        }

        
    });
  
    this.qrScannerComponent.capturedQr.subscribe(result => {
      this.qrResult = result;
    });
  }}