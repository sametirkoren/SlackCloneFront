import React from 'react'
import { Header, Input } from 'semantic-ui-react'


interface IProps{
    handleSearchChange:(event:any) => void
}

export const SearchInput : React.FC<IProps> = ({handleSearchChange}) => {
    return (
        <Header floated="right">
            <Input
                size="mini"
                icon="search"
                name="searchTerm"
                placeholder="Mesaj Ara"
                onChange={handleSearchChange}
            ></Input>
        </Header>
    )
}
