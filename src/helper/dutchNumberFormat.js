function dutchNumberFormat(number) {
    const deFormatter = new Intl.NumberFormat('nl-NL', { style: 'decimal' });
    return deFormatter.format(number); // 123.456,789
}

export default dutchNumberFormat;