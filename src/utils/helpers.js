import moment from "moment";

export function timestamp2TimeAgo(ts) {
    return moment.unix(ts).fromNow();
}