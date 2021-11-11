import styled from 'styled-components';
import { Button } from 'reactstrap';

export const AuthButton = styled(Button)`
    background: #fccb90;
    background: -webkit-linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593);
    background: linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593);
    border-radius: 20px;
	border: 1px solid #FF4B2B;
    font-size: 12px;
	font-weight: bold;
	padding: 12px 45px;
	letter-spacing: 1px;
`;

export const Center = styled.div`
    padding: 5px;
    text-align:center!important;
`;

export const Logo = styled.img`
    width: 225px;
`;