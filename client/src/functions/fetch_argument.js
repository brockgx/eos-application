const [query, setQuery] = useState(defaultValues)
  const [machines, setMachines] = useState({description: "default desc", content: []})

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setQuery({ ...query, [name]: value,});
      fetch(`/query/clientmachinemetrics?name=${query.name}`, {
        method: 'GET',
        body: query.name
      }).then(() => {
        window.location.reload();
      })
    };

    // Get all machines from db to display in drop down
    useEffect(() => {
      const getMachines = async () => {
        const machinesFromServer = await fetchMachines()
        setMachines(machinesFromServer)
      }
  
      getMachines()
    }, [])

    const fetchMachines = async () => {
      const resp = await fetch('/query/clientmachines')
      const data = await resp.json()
      if(resp.ok) {
        return data;
      } else {
        throw Error(`Request rejected with status ${resp.status}`);
      }
    }