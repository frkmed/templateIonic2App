import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {Push, PushToken} from '@ionic/cloud-angular'; //COMMENT nastaveni push notifikaci

import {Page1} from '../pages/page1/page1';
import {Page2} from '../pages/page2/page2';


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = Page1;

    pages: Array<{title: string, component: any}>;

    constructor(public platform: Platform, public push: Push) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            {title: 'Page One', component: Page1},
            {title: 'Page Two', component: Page2}
        ];

    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Splashscreen.hide();
        });

        this.pushNotification();

    }

    //COMMENT push notifikace
    pushNotification():void {
        this.push.register().then((t: PushToken) => {
            return this.push.saveToken(t);
        }).then((t: PushToken) => {
            console.log('Token saved:', t.token);
        });
        this.push.rx.notification()
            .subscribe((msg) => {
                alert(msg.title + ': ' + msg.text);
            });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}
