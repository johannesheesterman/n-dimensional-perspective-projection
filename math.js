class matrix{
    constructor(values){
        this.values = values;
    }

    multiply(m){
        let newMatrixValues = [];        
        for(let row = 0; row < this.values.length; row++){
            newMatrixValues[row] = [];
            for(let col = 0; col < m.values[0].length; col++){
                newMatrixValues[row][col] = 0;
                for(let inner = 0; inner < m.values.length; inner++){
                    newMatrixValues[row][col] += 
                        this.values[row][inner] * m.values[inner][col];
                }
            }
        }
        return new matrix(newMatrixValues);
    }
}