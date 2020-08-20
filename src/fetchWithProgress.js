
/**
 * @param {string} url
 * @param {object} options
 * @param {string} [options.method]
 * @param {{ [key: string]: string }} [options.headers]
 * @param {FormData} [options.body]
 * @param {string} [options.credentials]
 * @param {(progress: number) => void} [options.progress]
 * @param {(progress: number) => void} [options.uploadProgress]
 */
export default function fetchWithProgress (url, options={}) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const result = {};

        xhr.open(options.method || "GET", url);

        if (options.headers) {
            for (const [name, value] of Object.entries(options.headers)) {
                xhr.setRequestHeader(name, value);
            }
        }

        if (options.credentials === "include") {
            xhr.withCredentials = true;
        }

        if (options.progress) {
            xhr.addEventListener("progress", ev => {
                options.progress((ev.loaded / ev.total) * 100);
            });
        }

        if (options.uploadProgress) {
            xhr.upload.addEventListener("progress", ev => {
                options.uploadProgress((ev.loaded / ev.total) * 100);
            });
        }

        xhr.addEventListener("load", ev => {
            const result = {
                ok: xhr.status >= 200 && xhr.status < 300,
                text: () => Promise.resolve(xhr.responseText),
                json: () => Promise.resolve(JSON.parse(xhr.responseText)),
            };

            resolve(result);
        });

        xhr.addEventListener("error", reject);

        xhr.send(options.body);
    });
}