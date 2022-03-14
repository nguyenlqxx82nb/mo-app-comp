import PropTypes from 'prop-types';
declare const BackButton: {
    (props: any): JSX.Element;
    propTypes: {
        onBack: PropTypes.Requireable<(...args: any[]) => any>;
    };
    defaultProps: {
        onBack: {};
    };
};
export default BackButton;
