import styled from 'styled-components'

export const ContainerChartCategory = styled.div`
  min-width: 300px;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 1.25rem;
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.gray._200};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  .title {
    font-size: 1rem;
    font-weight: 600;
    line-height: 24px;
    color: ${({ theme }) => theme.colors.gray._900};
  }

  .chart-container {
    display: flex;
    justify-content: center;
    svg {
      width: 100%;
      height: auto;
    }
  }

  @media (max-width: 768px) {
    order: 2;
  }
`

export const SelectTypeCategory = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  justify-content: space-evenly;
`

export const SelectItem = styled.span<{ $isActive: boolean }>`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme, $isActive }) => ($isActive ? theme.colors.blue._600 : theme.colors.gray._500)};
  border-bottom: ${({ $isActive, theme }) => $isActive && `2px solid ${theme.colors.blue._600}`};

  transition: color 0.2s;
  cursor: pointer;
`

export const CategoryList = styled.ul`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
`

export const CategoryItem = styled.li`
  list-style: none;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray._200};
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 0.75rem 0.5rem;
  section {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .container-icon {
      width: 2.5rem;
      height: 2.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 20rem;

      svg {
        color: ${({ theme }) => theme.colors.white};
        width: 1rem;
        max-width: 1rem;
        height: 1rem;
        max-height: 1rem;
      }
    }

    .container-info {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      span {
      font-size: 1rem;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.black._900};
    }
    }
  }
  .percentage {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.gray._500};
    font-weight: 500;
  }
`
