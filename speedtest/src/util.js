
export function formatSpeed (bytesPerSecond) {
    if (bytesPerSecond >= 1e12) return `${(bytesPerSecond / 1e12).toFixed(1)} TB/s`;
    if (bytesPerSecond >= 1e9) return `${(bytesPerSecond / 1e9).toFixed(1)} GB/s`;
    if (bytesPerSecond >= 1e6) return `${(bytesPerSecond / 1e6).toFixed(1)} MB/s`;
    if (bytesPerSecond >= 1e3) return `${(bytesPerSecond / 1e3).toFixed(1)} KB/s`;
    return `${bytesPerSecond.toFixed(1)} B/s`;
}