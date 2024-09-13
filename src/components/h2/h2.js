import styled from "styled-components";
import PropTypes from 'prop-types'


const H2Container = ({ className, children }) => {
  return <h2 className={className}>{children}</h2>;
};

export const H2 = styled(H2Container)`
  margin: 40px 0;
  color: black;
`;

H2.propTypes = {
  children : PropTypes.node.isRequired
}