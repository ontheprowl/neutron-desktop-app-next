import { Chart as ChartJS, Legend, CategoryScale, BarElement, Tooltip, LinearScale, Title, BarController } from 'chart.js';
import React, { ForwardedRef, useEffect, useRef } from 'react';
import { useMemo } from 'react';
import { Bar, Chart } from 'react-chartjs-2';
import { ChartJSOrUndefined } from 'react-chartjs-2/dist/types';




export const SalesAndCollectionsChart = React.memo(NucleiSalesAndCollectionsChart);

export const AgeingBalanceChart = React.memo(NucleiAgeingBalanceChart);

function NucleiSalesAndCollectionsChart({ data }: { data: { outstanding: { '30d': number, '60d': number, '90d': number, 'excess': number }, revenue: { '30d': number, '60d': number, '90d': number, 'excess': number }, sales: { '30d': number, '60d': number, '90d': number, 'excess': number } } }) {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        BarController,
        Title,
        Tooltip,
        Legend
    );
    const options = {

        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return 'Rs. ' + Math.floor(Number(context.parsed.y))?.toLocaleString('en-IN');
                    }
                }
            },
            legend: {
                labels: {
                    font: {
                        size: 14,
                        family: 'Gilroy-Bold',
                    },
                    color: "#000000"
                }
            },
            // title: {
            //     display: true,
            //     text: ' Ageing Balances',
            // },
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                border: {
                    color: '#000000'
                },
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#000000',
                    font: {
                        size: 14,
                        family: 'Gilroy-Medium',
                    },
                }

            },
            y: {

                border: {
                    color: '#000000'
                },
                grid: {
                    display: false,
                },
                ticks: {
                    callback: function (data: number) {
                        return String(data / (10 * 10 * 10 * 10 * 10)).concat("L")
                    },
                    color: '#8E9AAB',
                    font: {
                        size: 14,
                        family: 'Gilroy-Bold',
                    },
                }

            }
        },
    };

    const labels = ['0-30d', '0-60d', '0-90d', 'All-time'];

    const chartData = {
        labels,
        datasets: [
            {
                barPercentage: 1.0,
                label: 'Sales',
                data: [data?.sales?.['30d'], data?.sales?.['60d'], data?.sales?.['90d'], data?.sales?.['excess']],
                backgroundColor: '#6950ba',
            },
            {
                barPercentage: 1.0,
                label: 'Collection',
                data: [data?.revenue?.['30d'], data?.revenue?.['60d'], data?.revenue?.['90d'], data?.revenue?.['excess']],
                backgroundColor: '#f670c7',
            },
        ],
    };

    return (
        <Bar redraw={false} datasetIdKey='id' options={options}
            data={chartData} >
        </Bar>)

}


function NucleiAgeingBalanceChart({ data }: { data: { 'due': number, 'overdue': number, '30d': number, '60d': number, '90d': number, 'excess': number, ref?: ForwardedRef<ChartJSOrUndefined<"bar", number[], string>> | undefined } }) {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        BarController,
        Title,
        Tooltip,
        Legend
    );

    const options = {

        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return 'Rs. ' + Math.floor(Number(context.parsed.y))?.toLocaleString('en-IN');
                    }
                }
            },
            legend: {

                display: false,

                labels: {
                    font: {
                        size: 14,
                        family: 'Gilroy-Bold',
                    },
                    color: "#000000"
                }
            },
            // title: {
            //     display: true,
            //     text: ' Ageing Balances',
            // },
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                border: {
                    color: '#000000'
                },
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#8E9AAB',
                    font: {
                        size: 14,
                        family: 'Gilroy-Medium',
                    },
                }

            },
            y: {

                border: {
                    color: '#000000'
                },
                grid: {
                    display: false,
                },
                ticks: {
                    callback: function (data: number) {
                        return String(data / (10 * 10 * 10 * 10 * 10)).concat("L")
                    },
                    color: '#8E9AAB',
                    font: {
                        size: 14,
                        family: 'Gilroy-Bold',
                    },
                }

            }
        },
    };

    const labels = ['Due', 'Overdue', '0-30d', '0-60d', '0-90d', 'All-time'];

    const chartData = {
        labels,
        datasets: [
            {
                borderRadius: 10,
                barPercentage: 1.0,
                barThickness: 45,
                data: [data['due'], data['overdue'], data['30d'], data['60d'], data['90d'], data['excess']],
                backgroundColor: ['#6950ba', '#f670c7', '#4F3A92', '#D50D8E', '#D33030', '#B81414']
            },
        ],
    };

    return (
        <Bar ref={data?.ref ? data?.ref : null} redraw={false}  datasetIdKey='id' options={options}
            data={chartData} >
        </Bar >)

}