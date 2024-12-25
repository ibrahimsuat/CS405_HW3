/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */



class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    
    //task1
    draw(mvp, modelView,normalMatrix,modelMatrix){
    
        var localmatrix = this.trs.getTransformationMatrix();
        var transformedMvp = MatrixMult(mvp, localmatrix);
        var transformedModelView = MatrixMult(modelView, localmatrix);
        var transformedNormals = MatrixMult(normalMatrix, localmatrix);
        var transformedModel = MatrixMult(modelMatrix, localmatrix);

        if (this.meshDrawer) {
            this.meshDrawer.draw(transformedMvp,transformedModelView,transformedNormals,transformedModel);
        }
    
        for (let i = 0; i < this.children.length; i++) {
            this.children[i].draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }
    }
}
