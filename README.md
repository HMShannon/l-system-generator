Inspired by [The Algorithmic Beauty of Plants](https://en.wikipedia.org/wiki/The_Algorithmic_Beauty_of_Plants)

Lindermayer systems, or l-systems, are a type of grammar that can be used to generate self-similar fractals and plant-like structures. An l-system is defined by an initial state(an axiom) and a set of rules to be applied iteratively to the axiom. For example:

Axiom: F
Rule : F -> F+F--F+F

After one iteration, the result is : F+F--F+F

After two iterations: F+F--F+F+F+F--F+F--F+F--F+F+F+F--F+F

After three iterations: F+F--F+F+F+F--F+F--F+F--F+F+F+F--F+F+F+F--F+F+F+F--F+F--F+F--F+F+F+F--F+F--F+F--F+F+F+F--F+F--F+F--F+F+F+F--F+F+F+F--F+F+F+F--F+F--F+F--F+F+F+F--F+F

If [F] represents a line, [+] represents a counterclockwise turn, [-] represents a clockwise turn, and a 60 degree angle is used, then graphically rendering this l-system results in the Koch curve:

<img alt="l-system Koch curve" src="https://raw.githubusercontent.com/HMShannon/l-system-generator/master/images/Koch_curve.png" />

If branching behavior is added, more complex structures are possible. An open bracket ( \[ ) saves a position, and a closing bracket( \] ) returns to that position, allowing for multiple segments to branch off of a single point:

<img alt="l-system tree" src="https://raw.githubusercontent.com/HMShannon/l-system-generator/master/images/l_system_tree.png" />
 
Run **git clone**, **npm install** to install dependencies, and **npm start** to try it.
