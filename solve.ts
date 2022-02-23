class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.left = (left === undefined ? null : left)
        this.right = (right === undefined ? null : right)
    }
}

function createTree(nodes: (number | null)[]): TreeNode | null {
    if (!nodes.length)
        return null
    const root = new TreeNode(nodes.shift()!), queue: TreeNode[] = [root]
    while (queue.length) {
        const len = queue.length
        for (let i = 0; i < len; i++) {
            const t = queue.shift()!, l = nodes.shift(), r = nodes.shift()
            t.left = l ? new TreeNode(l, null, null) : null
            t.right = r ? new TreeNode(r, null, null) : null
            t.left && queue.push(t.left)
            t.right && queue.push(t.right)
        }
    }
    return root
}



function isValidBST(root: TreeNode | null): boolean {
    let lastVisit: number | null = null
    function dfs(root: TreeNode | null) {
        if (!root) return true
        const l = isValidBST(root.left)
        if (lastVisit !== null && lastVisit >= root.val)
            return false
        lastVisit = root.val
        const r = isValidBST(root.right)
        return l && r
    }
    return dfs(root)
};

console.log(isValidBST(createTree([5,1,4,null,null,3,6])))