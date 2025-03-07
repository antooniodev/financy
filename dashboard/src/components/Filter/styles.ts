import styled from 'styled-components'

export const WrapperFilter = styled.ul`
  width: fit-content;
  border-radius: 1rem;
  list-style: none;
  display: flex;
  align-items: center;
`

export const SListItem = styled.li<{
  $isActive: boolean
  $isCustomPeriod: boolean
}>`
    display: flex;
    align-items: center;
    gap: 0.25rem;
    background-color: ${({ theme, $isActive }) => ($isActive ? theme.colors.gray._100 : theme.colors.white)};
    color: ${({ theme, $isActive }) => ($isActive ? theme.colors.blue._600 : theme.colors.gray._600)};
    font-size: 0.9rem;
    font-weight: 600;
    padding: 0.5rem 1.5rem;
    border: 1px solid ${({ theme }) => theme.colors.gray._200};
    cursor: pointer;
    svg {
      color: ${({ theme, $isActive }) => ($isActive ? theme.colors.blue._600 : 'black')};
    }

    &:first-child {
      border-bottom-left-radius: 0.5rem;
      border-top-left-radius: 0.5rem;
    }

    &:nth-child(4) {
      border-top-right-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
    }

    &:last-child {
      border-radius: 0.5rem;
      margin-left: 1rem;
    }

    .container-custom-period {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      .save-button {
        background-color: ${({ theme }) => theme.colors.blue._600};
        color: white;
        border: none;
        border-radius: 2px;
        padding: 0.4rem;
      }
    }

    .react-datepicker__close-icon::after {
      background-color: ${({ theme }) => theme.colors.gray._600};
    }

  .react-datepicker__input-container {
    input {
      width: 11rem;
      height: 1.5rem;
      color: ${({ theme }) => theme.colors.blue._600};
      border: none;
      background-color: ${({ theme }) => theme.colors.gray._100};
      font-size: 0.82rem;
      font-weight: 600;
    }
  }
  

  @media (max-width: 768px) {
  
        font-size: 0.8rem;
        padding: 0.4rem 0.9rem;
    
  }

  @media (max-width: 610px) {
   
      font-size: 0.75rem;
      padding: 0.25rem 0.8rem;
      &:last-child {
        border-radius: 0.5rem;
        margin-left: 0.5rem;
      }
  
  }

  @media (max-width: 380px) {
   
      padding: 0.25rem 0.375rem;
    
  }
`
