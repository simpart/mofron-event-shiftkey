const Key = require('mofron-event-key');
const ConfArg = mofron.class.ConfArg;

/**
 * @file mofron-event-shiftkey/index.js
 * @brief shiftkey event for mofron
 * @license MIT
 */
module.exports = class extends mofron.class.Event {
    /**
     * initialize event
     * 
     * @param (mixed) short-form parameter
     *                key-value: event config
     * @short
     * @type private
     */
    constructor (prm) {
        try {
            super();
            this.modname("ShiftKey");
            this.confmng().add('isShiftKeyDown', { type:'boolean', init:false });

	    if (undefined !== prm) {
                this.config(prm);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    component (prm) {
        try {
            if (undefined !== prm) {
	        let key_lst = [
                    new Key({ key:'Shift', type:'keydown', listener:new ConfArg(this.shiftDown,this) }),
                    new Key({ key:'Shift', type: 'keyup', listener:new ConfArg(this.shiftUp,this) }),
                ];
                prm.event(key_lst);
                this.data('key_buff', key_lst);
            }
            return super.component(prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    contents () {}

    shiftDown (s1,s2,s3) {
        try {
            s3.isShiftKeyDown(true);
            let evt = s3.listener();
            for (let eidx in evt) {
                evt[eidx][0](s3.component(), true, evt[eidx][1]);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    shiftUp (s1,s2,s3) {
        try {
            s3.isShiftKeyDown(false);
            let evt = s3.listener();
            for (let eidx in evt) {
                evt[eidx][0](s3.component(), false, evt[eidx][1]);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    isShiftKeyDown (prm) {
        try {
            return this.confmng('isShiftKeyDown', prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }

    destroy () {
        try {
            let key_buff = this.data('key_buff');
            for (let kidx in key_buff) {
                key_buff[kidx].destroy();
            }
            super.destroy();
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
