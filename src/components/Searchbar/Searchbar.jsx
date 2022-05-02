import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  Header,
  ButtonIcon,
  Input,
  SearchButton,
  SearchForm,
} from './Searchbar.styled';

// export class Searchbar extends Component {
//   state = {
//     searchQuery: '',
//   };

//   handleQueryChange = e => {
//     this.setState({ searchQuery: e.currentTarget.value });
//   };

//   handlSubmit = e => {
//     e.preventDefault();
//     if (this.state.searchQuery.trim() === '') {
//       return alert('Insert correct request');
//     }
//     const { searchQuery } = this.state;
//     this.props.onSubmit(searchQuery);
//     this.setState({ searchQuery: '' });
//   };

//   render() {
//     const { searchQuery } = this.state;
//     return (
//       <Header>
//         <SearchForm onSubmit={this.handlSubmit}>
//           <SearchButton>
//             <ButtonIcon />
//           </SearchButton>
//           <Input
//             type="text"
//             name="searchQuery"
//             value={searchQuery}
//             autocomplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             onChange={this.handleQueryChange}
//           />
//         </SearchForm>
//       </Header>
//     );
//   }
// }

export const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleQueryChange = e => {
    setSearchQuery(e.currentTarget.value);
  };

  const handlSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      return alert('Insert correct request');
    }
    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <Header>
      <SearchForm onSubmit={handlSubmit}>
        <SearchButton>
          <ButtonIcon />
        </SearchButton>
        <Input
          type="text"
          name="searchQuery"
          value={searchQuery}
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleQueryChange}
        />
      </SearchForm>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
