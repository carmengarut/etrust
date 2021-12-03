import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { colors } from '../themes'

export const StyledLink = styled(Link)`
    color: ${colors.primary};
    text-decoration: none;
    padding: 5px;
    font-weight: ${props => props.variant === 'bold' ? 'bold' : 'regular'};

    &:hover {
        border-bottom: 2px solid ${colors.primary};
    }
`
