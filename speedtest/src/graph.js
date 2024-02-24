import React from 'react';
import { formatSpeed } from './util';

export default function Graph ({ value, color, width=300 }) {
    const max = Math.pow(10, Math.ceil(Math.log10(value) / 3) * 3);
    const rotate = (value / max) * 180;

    return (
        <svg width={width} viewBox="0 0 440 150">
            <g>
                <ellipse cx="210" cy="150" rx="140" ry="140" stroke={color} strokeWidth="10" fill="none" />
                <path d="M70 145 L 210 140 L 220 145 L 210 150 Z" fill="white" transform={`translate(210,145) rotate(${rotate}) translate(-210,-145) `} />
                <text fill="white" x="360" y="150" style={{ fontSize: 18 }}>{formatSpeed(max)}</text>
            </g>
        </svg>
    )
}