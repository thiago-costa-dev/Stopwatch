import React, { Component } from 'react';
import './Stopwatch.css';

export default class Stopwatch extends Component {
    state = { hours: "00", minutes: "00", seconds: "00" };
    hours = 0;
    minutes = 0;
    seconds = 0;

    getTime = () => {
        return `${this.state.hours}:${this.state.minutes}:${this.state.seconds}`;
    }

    putZeroOnLeft = (number) => {
        if (number < 10) return `0${number}`;
        return number;
    }

    tick = () => {
        this.seconds++;
        if (this.seconds === 60) {
            this.seconds = 0;

            this.minutes++;
            if (this.minutes === 60) {
                this.minutes = 0;

                this.hours++;
            }
        }

        this.setState({
            hours: this.putZeroOnLeft(this.hours), 
            minutes: this.putZeroOnLeft(this.minutes), 
            seconds: this.putZeroOnLeft(this.seconds)
        });
    }

    reset = () => {
        if (this.myInterval) clearInterval(this.myInterval);

        this.hours = 0; this.minutes = 0; this.seconds = 0;
        this.setState({ hours: "00", minutes: "00", seconds: "00" });

        document.getElementById('timer').classList.add('stoped');
    }

    start = () => {
        this.myInterval = setInterval(this.tick, 1000);
        document.getElementById('timer').classList.remove('stoped');
    }

    stop = () => {
        if (this.myInterval) clearInterval(this.myInterval);
        document.getElementById('timer').classList.add('stoped');
    }

    render = () => {
        return (
            <main className='container'>
                <h1 className="timer stoped" id="timer">{this.getTime()}</h1>
                <div className='buttons'>
                    <button onClick={this.start}>Start</button>
                    <button onClick={this.stop}>Stop</button>
                    <button onClick={this.reset}>Reset</button>
                </div>
            </main>
        );
    }
}