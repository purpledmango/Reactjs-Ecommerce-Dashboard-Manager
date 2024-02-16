export const panelBranding = "The Silk Store";
export const fotterCreds = "placeholder@mail.com";
export const licensedDate = new Date().toLocaleString();
export const expiringData = new Date();

export const topProductsData = [
    { productName: "Chic Dress", quantitySold: 120, stock: 180 },
    { productName: "Stylish Jeans", quantitySold: 80, stock: 20 },
    { productName: "Casual Sneakers", quantitySold: 200, stock: 50 },
    { productName: "Cozy Sweater", quantitySold: 90, stock: 120 },
    { productName: "Elegant Blouse", quantitySold: 150, stock: 80 },
    { productName: "Classic Suit", quantitySold: 30, stock: 50 },
    { productName: "Trendy T-Shirt", quantitySold: 100, stock: 30 },
    { productName: "Formal Shirt", quantitySold: 70, stock: 40 },
    { productName: "Sporty Shorts", quantitySold: 180, stock: 20 },
    { productName: "High Heels", quantitySold: 50, stock: 60 },
    { productName: "Leather Jacket", quantitySold: 25, stock: 75 },
    { productName: "Boho Skirt", quantitySold: 120, stock: 30 },
    { productName: "Smart Watch", quantitySold: 60, stock: 90 },
    { productName: "Denim Jacket", quantitySold: 40, stock: 60 },
    { productName: "Sun Hat", quantitySold: 110, stock: 40 },
    { productName: "Formal Trousers", quantitySold: 85, stock: 15 },
    { productName: "Fashionable Backpack", quantitySold: 30, stock: 70 },
    { productName: "Sweatshirt Hoodie", quantitySold: 65, stock: 35 },
    { productName: "Ankle Boots", quantitySold: 55, stock: 45 },
    { productName: "Printed Scarf", quantitySold: 95, stock: 25 },
];

export const revenueGraphData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Revenue',
            data: [1500, 2000, 1800, 2200, 2500, 2100, 2400],
            backgroundColor: 'rgb(58 80 107 )',
            borderColor: 'rgb(91 192 190 )',
            borderWidth: 2,
            pointRadius: 12, // Optional: If you want to hide the points on the line
        },
    ],
};

export const revenueGraphOptions = {
    scales: {
        x: {
            type: 'category',
            title: {
                display: true,
                text: 'Months',
            },
            ticks: {
                color: "#5cc0be",
                // font: {
                //     size: 16, // Change the font size of y-axis ticks
                // },
            }

        },
        y: {
            title: {
                display: true,
                text: 'Revenue ($)',
            },
        },
    },
    plugins: {
        legend: {
            display: true,
            position: 'top',
        },
    },
    // indexAxis: 'x',
    // elements: {
    //     bar: {
    //         barThickness: 2, // Adjust the width of each bar
    //     },
    // },
};


export const ticketsKpiData = [{
    name: "this week",
    data: 9
}, {
    name: "this month",
    data: 28
}]
export const marginsKpiData = [{
    name: "Spent this month",
    data: 5000
}, {
    name: "Earned this month",
    data: 60023
}]
export const deliveryKpiData = [{
    name: "Dispatched",
    data: 62
}, {
    name: "Delivered",
    data: 300
}]
