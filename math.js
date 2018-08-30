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

    add(m){
        let newMatrixValues = [];

        for(let row = 0; row < this.values.length; row++){
            newMatrixValues[row] = [];
            for(let col = 0; col < this.values[row].length; col++){
                newMatrixValues[row][col] = 
                    this.values[row][col] + m.values[row][col];
            }
        }

        return new matrix(newMatrixValues);
    }

    subtract(m){
        let newMatrixValues = [];

        for(let row = 0; row < this.values.length; row++){
            newMatrixValues[row] = [];
            for(let col = 0; col < this.values[row].length; col++){
                newMatrixValues[row][col] = 
                    this.values[row][col] - m.values[row][col];
            }
        }

        return new matrix(newMatrixValues);
    }
}

class Vec2 {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    mulScalar(s){
        return new Vec2(
            this.x * s,
            this.y * s
        );
    }

    mulVec(v) {
        return new Vec2(
            this.x * v.x,
            this.y * v.y
        );
    }
}

class Vec3 {
    constructor(x,y,z){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    mulScalar(s){
        return new Vec3(
            this.x * s,
            this.y * s,
            this.z * s
        );
    }

    subtractVec(v){
        return new Vec3(
            this.x - v.x,
            this.y - v.y,
            this.z - v.z
        );
    }
}