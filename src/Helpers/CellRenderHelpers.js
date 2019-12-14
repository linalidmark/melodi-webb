import React from 'react';

export function ScoreCell() {
    return <input className="score-cell" type="number" placeholder="score" min="1" max="10"></input>
}