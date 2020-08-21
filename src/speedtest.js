import fetchWithProgress from './fetchWithProgress';

const pkg = require('../package.json');

const hp = new URL(pkg.homepage);
const ROOT = hp.pathname === "/" ? "" : hp.pathname;

const PING_COUNT = 20;
const PING_WARMUP = 5;
const PING_TARGET = ROOT + "/ping.txt";

const DOWNLOAD_MIN_DURATION = 5000;
const DOWNLOAD_1MB_TARGET = ROOT + "/1MB.bin";
const DOWNLOAD_2MB_TARGET = ROOT + "/2MB.bin";
const DOWNLOAD_10MB_TARGET = ROOT + "/10MB.bin";
const DOWNLOAD_SIZES = [
    { target: DOWNLOAD_1MB_TARGET, size: 1e6 },
    { target: DOWNLOAD_2MB_TARGET, size: 2e6 },
    { target: DOWNLOAD_10MB_TARGET, size: 10e6 },
];

const UPLOAD_TARGET = ROOT + "/dev/null";
const UPLOAD_INITIAL_SIZE = 1e6;
const UPLOAD_MAX_SIZE = 10e6;
const UPLOAD_MIN_DURATION = 5000;

export async function pingTest () {
    performance.clearResourceTimings();
    for (let i = -PING_WARMUP; i < PING_COUNT; i++) await fetch(PING_TARGET, { headers: { "Cache-Control": "no-cache" } });
    /** @type {PerformanceResourceTiming[]} */
    let entries = (performance.getEntriesByType("resource"));
    entries = entries.filter(e => e.name.endsWith(PING_TARGET));
    entries = entries.slice(-PING_COUNT);
    const timings = entries.map(e => e.responseStart - e.requestStart);
    return avg(timings);
}

/**
 * @param {(progress: number) => void} [reportProgress]
 */
export async function downloadTest (reportProgress = null) {
    let duration = 0;
    let speed = 0;
    for (let i = 0; duration < DOWNLOAD_MIN_DURATION && i < DOWNLOAD_SIZES.length; i++) {
        const start = performance.now();
        const d = DOWNLOAD_SIZES[i];
        speed = await downloadFile(d.target, d.size, reportProgress);
        duration = performance.now() - start;
    }
    return speed;
}

async function downloadFile (path, size, progress) {
    performance.clearResourceTimings();
    const start = performance.now();
    await fetchWithProgress(path, {
        headers: {
            "Cache-Control": "no-cache",
        },
        progress: p => {
            const time = performance.now() - start;
            const downloaded = size * p / 100;
            const speed = downloaded / time * 1000;
            progress(speed);
        },
    });
    const event = performance.getEntriesByType("resource").find(e => e.name.endsWith(path));
    return size / event.duration * 1000;
}

/**
 * @param {(progress: number) => void} [reportProgress]
 */
export async function uploadTest (reportProgress = null) {
    let duration = 0;
    let speed = 0;
    for (let s = UPLOAD_INITIAL_SIZE; duration < UPLOAD_MIN_DURATION && s < UPLOAD_MAX_SIZE; s *= 2) {
        const start = performance.now();
        speed = await uploadFile(UPLOAD_TARGET, new ArrayBuffer(s), reportProgress);
        duration = performance.now() - start;
    }
    return speed;
}

/**
 * @param {string} path
 * @param {ArrayBuffer} data
 * @param { (progress: number) => void } progress
 */
async function uploadFile (path, data, progress) {
    performance.clearResourceTimings();
    const body = new FormData();
    body.set("data", new Blob([data]));
    const start = performance.now();
    await fetchWithProgress(path, {
        method: "post",
        body,
        uploadProgress: p => {
            const time = performance.now() - start;
            const uploaded = data.byteLength * p / 100;
            const speed = uploaded / time * 1000;
            progress(speed);
        },
    });
    const event = performance.getEntriesByType("resource").find(e => e.name.endsWith(path));
    return data.byteLength / event.duration * 1000;
}

/**
 * @param {number[]} list
 */
function avg (list) {
    return list.reduce((a,b) => a + b, 0) / list.length;
}