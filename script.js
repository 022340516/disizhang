// 全局变量和配置
let currentTheme = 'business';
let currentColormap = 'viridis';
let currentFontSize = 12;

// 主题配色方案
const themeSchemes = {
    business: { 
        name: "商务专业风", 
        colors: { 
            primary: "#1e3a8a", 
            secondary: "#374151",
            accent: "#3b82f6",
            background: "#f8fafc",
            card: "#ffffff"
        }
    },
    tech: { 
        name: "科技未来风", 
        colors: { 
            primary: "#06b6d4", 
            secondary: "#0ea5e9",
            accent: "#10b981",
            background: "#0f172a",
            card: "#1e293b"
        }
    },
    minimal: { 
        name: "简约清新风", 
        colors: { 
            primary: "#10b981", 
            secondary: "#059669",
            accent: "#f59e0b",
            background: "#f0fdf4",
            card: "#ffffff"
        }
    }
};

// 颜色映射表（基于第4章内容）
const colormaps = {
    viridis: ["#440154", "#31688e", "#35b779", "#fde725"],
    coolwarm: ["#3b4cc0", "#9ebcf5", "#f7b6b1", "#b40426"],
    tab10: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"],
    Set3: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd"]
};

// 图表数据（基于实验文件）
const chartData = {
    // 汇率走势数据
    exchangeRate: {
        dates: [3, 8, 13, 17, 25, 31],
        rate2017: [6.8007, 6.8060, 6.7835, 6.7700, 6.7511, 6.7265],
        rate2019: [6.8640, 6.8881, 6.8662, 6.8827, 6.8737, 6.8841]
    },
    
    // 产品销售数据
    productSales: {
        quarters: ['第1季度', '第2季度', '第3季度', '第4季度'],
        salesA: [2144, 4617, 7674, 4409],
        salesC: [153, 1214, 2414, 680]
    },
    
    // 散点图数据
    scatterData: {
        x: Array.from({length: 50}, () => Math.random() * 10),
        y: Array.from({length: 50}, () => Math.random() * 10),
        values: Array.from({length: 50}, () => Math.random())
    },
    
    // 温度数据
    temperature: {
        dates: Array.from({length: 15}, (_, i) => i + 4),
        maxTemp: [28, 30, 32, 34, 31, 29, 27, 28, 30, 31, 29, 28, 27, 26, 25],
        minTemp: [18, 20, 22, 23, 21, 19, 17, 18, 20, 21, 19, 18, 17, 16, 15]
    },
    
    // 数学函数数据
    mathFunction: {
        x: Array.from({length: 100}, (_, i) => i * 0.05),
        y: Array.from({length: 100}, (_, i) => Math.pow(i * 0.05, 2))
    }
};

// 初始化函数
document.addEventListener('DOMContentLoaded', function() {
    initializeControls();
    initializeCharts();
    applyTheme();
});

// 初始化控制面板
function initializeControls() {
    const themeSelect = document.getElementById('theme-select');
    const colormapSelect = document.getElementById('colormap-select');
    const fontSizeSlider = document.getElementById('font-size');
    const fontSizeValue = document.getElementById('font-size-value');
    
    // 主题切换
    themeSelect.addEventListener('change', function(e) {
        currentTheme = e.target.value;
        applyTheme();
        updateAllCharts();
    });
    
    // 颜色映射切换
    colormapSelect.addEventListener('change', function(e) {
        currentColormap = e.target.value;
        updateAllCharts();
    });
    
    // 字体大小调整
    fontSizeSlider.addEventListener('input', function(e) {
        currentFontSize = parseInt(e.target.value);
        fontSizeValue.textContent = currentFontSize + 'px';
        document.documentElement.style.setProperty('--font-size', currentFontSize + 'px');
        updateAllCharts();
    });
}

// 应用主题样式
function applyTheme() {
    const theme = themeSchemes[currentTheme];
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // 更新CSS变量
    Object.entries(theme.colors).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--${key}-color`, value);
    });
}

// 获取当前主题的图表配色
function getChartColors() {
    const theme = themeSchemes[currentTheme];
    return {
        primary: theme.colors.primary,
        secondary: theme.colors.secondary,
        accent: theme.colors.accent,
        text: getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim(),
        muted: getComputedStyle(document.documentElement).getPropertyValue('--text-muted').trim()
    };
}

// 初始化所有图表
function initializeCharts() {
    createExchangeRateChart();
    createProductSalesChart();
    createScatterChart();
    createTemperatureChart();
    createMathFunctionChart();
}

// 更新所有图表
function updateAllCharts() {
    initializeCharts();
}

// 图表1：汇率走势图
function createExchangeRateChart() {
    const chart = echarts.init(document.getElementById('chart1'));
    const colors = getChartColors();
    
    const option = {
        title: {
            text: '2017年7月与2019年7月美元/人民币汇率走势',
            textStyle: {
                color: colors.text,
                fontSize: currentFontSize
            }
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor: colors.primary,
            textStyle: { color: '#fff' }
        },
        legend: {
            data: ['2017年7月汇率', '2019年7月汇率'],
            textStyle: { color: colors.text }
        },
        xAxis: {
            type: 'category',
            data: chartData.exchangeRate.dates.map(d => `7月${d}日`),
            axisLine: { lineStyle: { color: colors.muted } },
            axisLabel: { color: colors.text, fontSize: currentFontSize - 1 }
        },
        yAxis: {
            type: 'value',
            axisLine: { lineStyle: { color: colors.muted } },
            axisLabel: { color: colors.text, fontSize: currentFontSize - 1 }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        series: [
            {
                name: '2017年7月汇率',
                type: 'line',
                data: chartData.exchangeRate.rate2017,
                lineStyle: {
                    type: 'dashDot',
                    width: 1,
                    color: colormaps[currentColormap][0]
                },
                symbol: 'circle',
                symbolSize: 6,
                itemStyle: { color: colormaps[currentColormap][0] }
            },
            {
                name: '2019年7月汇率',
                type: 'line',
                data: chartData.exchangeRate.rate2019,
                lineStyle: {
                    type: 'dashed',
                    width: 3,
                    color: colormaps[currentColormap][1]
                },
                symbol: 'rect',
                symbolSize: 8,
                itemStyle: { color: colormaps[currentColormap][1] }
            }
        ]
    };
    
    chart.setOption(option);
    window.addEventListener('resize', () => chart.resize());
}

// 图表2：产品销售对比图
function createProductSalesChart() {
    const chart = echarts.init(document.getElementById('chart2'));
    const colors = getChartColors();
    
    const option = {
        title: {
            text: '产品A与产品C各季度销售额对比',
            textStyle: {
                color: colors.text,
                fontSize: currentFontSize
            }
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor: colors.primary,
            textStyle: { color: '#fff' }
        },
        legend: {
            data: ['产品A', '产品C', 'A/C销售差'],
            textStyle: { color: colors.text }
        },
        xAxis: {
            type: 'category',
            data: chartData.productSales.quarters,
            axisLine: { lineStyle: { color: colors.muted } },
            axisLabel: { color: colors.text, fontSize: currentFontSize - 1 }
        },
        yAxis: {
            type: 'value',
            axisLine: { lineStyle: { color: colors.muted } },
            axisLabel: { color: colors.text, fontSize: currentFontSize - 1 }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        series: [
            {
                name: '产品A',
                type: 'line',
                data: chartData.productSales.salesA,
                lineStyle: { width: 2, color: colormaps[currentColormap][0] },
                symbol: 'circle',
                symbolSize: 8,
                itemStyle: { color: colormaps[currentColormap][0] }
            },
            {
                name: '产品C',
                type: 'line',
                data: chartData.productSales.salesC,
                lineStyle: { width: 2, color: colormaps[currentColormap][1] },
                symbol: 'circle',
                symbolSize: 8,
                itemStyle: { color: colormaps[currentColormap][1] }
            },
            {
                name: 'A/C销售差',
                type: 'line',
                data: chartData.productSales.salesA.map((val, idx) => val - chartData.productSales.salesC[idx]),
                lineStyle: { width: 0 },
                areaStyle: {
                    color: '#ADD8E6',
                    opacity: 0.3
                }
            }
        ]
    };
    
    chart.setOption(option);
    window.addEventListener('resize', () => chart.resize());
}

// 图表3：散点图（颜色映射）
function createScatterChart() {
    const chart = echarts.init(document.getElementById('chart3'));
    const colors = getChartColors();
    
    const option = {
        title: {
            text: '使用颜色映射表的散点图',
            textStyle: {
                color: colors.text,
                fontSize: currentFontSize
            }
        },
        tooltip: {
            trigger: 'item',
            backgroundColor: colors.primary,
            textStyle: { color: '#fff' }
        },
        xAxis: {
            type: 'value',
            axisLine: { lineStyle: { color: colors.muted } },
            axisLabel: { color: colors.text, fontSize: currentFontSize - 1 }
        },
        yAxis: {
            type: 'value',
            axisLine: { lineStyle: { color: colors.muted } },
            axisLabel: { color: colors.text, fontSize: currentFontSize - 1 }
        },
        visualMap: {
            type: 'continuous',
            min: 0,
            max: 1,
            dimension: 2,
            inRange: {
                color: colormaps[currentColormap]
            },
            textStyle: { color: colors.text }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        series: [{
            type: 'scatter',
            data: chartData.scatterData.x.map((x, i) => [x, chartData.scatterData.y[i], chartData.scatterData.values[i]]),
            symbolSize: 15,
            itemStyle: {
                opacity: 0.7
            }
        }]
    };
    
    chart.setOption(option);
    window.addEventListener('resize', () => chart.resize());
}

// 图表4：温度变化趋势图
function createTemperatureChart() {
    const chart = echarts.init(document.getElementById('chart4'));
    const colors = getChartColors();
    
    const option = {
        title: {
            text: '每日最高温度与最低温度走势',
            textStyle: {
                color: colors.text,
                fontSize: currentFontSize
            }
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor: colors.primary,
            textStyle: { color: '#fff' }
        },
        legend: {
            data: ['最高温度', '最低温度'],
            textStyle: { color: colors.text }
        },
        xAxis: {
            type: 'category',
            data: chartData.temperature.dates.map(d => `${d}日`),
            axisLine: { lineStyle: { color: colors.muted } },
            axisLabel: { color: colors.text, fontSize: currentFontSize - 1 }
        },
        yAxis: {
            type: 'value',
            axisLine: { lineStyle: { color: colors.muted } },
            axisLabel: { color: colors.text, fontSize: currentFontSize - 1 }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        series: [
            {
                name: '最高温度',
                type: 'line',
                data: chartData.temperature.maxTemp,
                lineStyle: { width: 2, color: colormaps[currentColormap][0] },
                symbol: 'triangle',
                symbolSize: 10,
                itemStyle: { 
                    color: colormaps[currentColormap][0],
                    borderColor: '#ff0000',
                    borderWidth: 2
                }
            },
            {
                name: '最低温度',
                type: 'line',
                data: chartData.temperature.minTemp,
                lineStyle: { width: 2, color: colormaps[currentColormap][1] },
                symbol: 'triangleDown',
                symbolSize: 10,
                itemStyle: { color: colormaps[currentColormap][1] }
            }
        ]
    };
    
    chart.setOption(option);
    window.addEventListener('resize', () => chart.resize());
}

// 图表5：数学函数可视化
function createMathFunctionChart() {
    const chart = echarts.init(document.getElementById('chart5'));
    const colors = getChartColors();
    
    const option = {
        title: {
            text: '数学函数可视化（y = x²）',
            textStyle: {
                color: colors.text,
                fontSize: currentFontSize
            }
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor: colors.primary,
            textStyle: { color: '#fff' }
        },
        xAxis: {
            type: 'value',
            axisLine: { lineStyle: { color: colors.muted } },
            axisLabel: { color: colors.text, fontSize: currentFontSize - 1 }
        },
        yAxis: {
            type: 'value',
            axisLine: { lineStyle: { color: colors.muted } },
            axisLabel: { color: colors.text, fontSize: currentFontSize - 1 }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        series: [{
            type: 'line',
            data: chartData.mathFunction.x.map((x, i) => [x, chartData.mathFunction.y[i]]),
            lineStyle: { 
                width: 3, 
                color: colormaps[currentColormap][0] 
            },
            symbol: 'none',
            smooth: true
        }]
    };
    
    chart.setOption(option);
    window.addEventListener('resize', () => chart.resize());
}