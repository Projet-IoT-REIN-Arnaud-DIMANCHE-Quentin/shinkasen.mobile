const Svg = (props) => <svg {...props} />;
const G = (props) => <g {...props} />;
const Path = (props) => <path {...props} />;
const Circle = (props) => <circle {...props} />;
const Rect = (props) => <rect {...props} />;
const Line = (props) => <line {...props} />;
const Polyline = (props) => <polyline {...props} />;
const Polygon = (props) => <polygon {...props} />;
const Text = (props) => <text {...props} />;

export {
    Circle, G, Line, Path, Polygon, Polyline, Rect, Svg, Text
};
export default Svg;
