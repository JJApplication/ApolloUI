import store from "../store/store";
import {sendMessage} from "../store/actions";

export default function notifySync(text, type) {
    store.dispatch(sendMessage({
        message: text,
        check: true,
        t: type,
    }));
}