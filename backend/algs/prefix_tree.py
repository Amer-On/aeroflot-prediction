class PrefixTree:
    tree: dict = {'': {'is_city': False}}
    __used_cities: set = set()


    def __set_in_tree(self, city: str) -> None:
        self.__used_cities.add(city)


    def __in_tree(self, city: str) -> bool:
        return city in self.__used_cities


    def add(self, city: str) -> None:
        if self.__in_tree(city):
            return
        self.__set_in_tree(city)
        currently_prefix = ""
        currently_node = self.tree[""]
        for index_letter in range(len(city)):
            if currently_prefix + city[index_letter] not in currently_node:
                currently_node[currently_prefix + city[index_letter]] = {'is_city': False}
            if index_letter + 1 == len(city):
                currently_node[currently_prefix + city[index_letter]]['is_city'] = True
            currently_prefix += city[index_letter]
            currently_node = currently_node[currently_prefix]


    def generate(self, cities: list[str]) -> None:
        cities.sort()
        for city in cities:
            self.add(city)


    def fetch_cities(self, node, prefix) -> list:
        res = []
        for city in node:
            if city == 'is_city':
                continue
            res += self.fetch_cities(node[city], city)
        if node['is_city'] == True:
            res.append(prefix)
        return res

    
    def get_cities_by_prefix(self, prefix) -> list:
        if len(prefix) <= 1:
            return []

        # select node
        currently_node = self.tree['']
        currently_prefix = ''
        for i in prefix:
            next_node = currently_prefix + i
            if next_node not in currently_node:
                return []
            currently_node = currently_node[next_node]
            currently_prefix = next_node

        # fetch cities
        return sorted(self.fetch_cities(currently_node, currently_prefix))


    def __repr__(self) -> str:
        return f"PrefixTree object\nIncluded next cities: {', '.join(sorted(list(self.__used_cities)))}"


if __name__ == "__main__":
    prefix_tree = PrefixTree()

    # Get cities by prefix
    prefix_tree.generate(["Омар", "Бар", "Омск", "Омонск", "Обь", "Омсукчан"])
    res = prefix_tree.get_cities_by_prefix("Ом")
    assert res == ['Омар', 'Омонск', 'Омск', 'Омсукчан']
    
    # Try add dublicate city
    prefix_tree.add("Омск")
    res = prefix_tree
    assert str(res) == f'PrefixTree object\nIncluded next cities: {", ".join(sorted(["Омар", "Бар", "Омск", "Омонск", "Обь", "Омсукчан"]))}'
