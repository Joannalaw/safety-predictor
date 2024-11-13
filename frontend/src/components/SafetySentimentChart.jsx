import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const SafetySentimentChart = ({ posts }) => {
    // Map posts to data points for the scatter plot
    const dataPoints = posts?.map(post => ({
        x: post.safetyIndex,       // Safety score
        y: post.safetyIndex,    // Sentiment score
        label: post.content,     // Text of the post for tooltip
    }));

    const data = {
        datasets: [
            {
                label: 'Posts',
                data: dataPoints,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                pointRadius: 8,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                title: { display: true, text: 'Safety (Safe to Dangerous)' },
                min: 0,
                max: 10,
            },
            y: {
                title: { display: true, text: 'Sentiment (Happy to Sad)' },
                min: 0,
                max: 10,
            },
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const { label, x, y } = context.raw;
                        return `${label} (Safety: ${x}, Sentiment: ${y})`;
                    },
                },
            },
        },
    };

    return (
        <div style={{margin:'10%'}}>
            <h2>Social Media Post Analysis: Safety vs. Sentiment</h2>
            <Scatter data={data} options={options} />
        </div>
    );
};

export default SafetySentimentChart;