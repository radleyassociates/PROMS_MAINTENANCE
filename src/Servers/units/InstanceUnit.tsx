import { Box } from '@chakra-ui/react'
import Status from '../../components/status/Status'
import { useNavigate } from 'react-router-dom'
import { BellIcon } from '@chakra-ui/icons'

interface InstanceUnitProps {
  server: string;
  instance: any;
}

const InstanceUnit = ({  instance , server }: InstanceUnitProps) => {
  const navigate = useNavigate()
  const border = instance.error ? 'rgba(222, 15, 15, 0.8)' :  'rgba(36, 36, 36, 0.9)'
  
  const details = [{
    title: 'Historical',
    field: 'historicalDir'
  }
  ,
  { title: 'Input',
    field: 'inputDir'
  },
  { title: 'Output',
    field: 'outputDir'
  }]

  return (
    <Box className='instance-container' style={{ borderTop: `20px solid ${border}` }}>

      <Box className='xsb' mb={1}>
        <Status status={!instance.error} title={ instance.title} />
        {instance.error && <BellIcon className='bell-icon'/>}
      </Box>
      
      {instance.error ? <p>{instance.error}</p> :
        <>
          <Box flexGrow={1} overflow='scroll'>
            {details.map(d => 
              <Box className='xsb' key={d.field}>
                <p className='bold'>{d.title}</p>
                <p>{instance[d.field]}</p>
              </Box>
            )}
            <Box mt={1}>
              <p className='bold'>Database</p>
              <p>{instance.databaseURL}</p>
            </Box>
          </Box>
          <p className='expand' onClick={() => navigate(`${server}/${instance.id}`)}>See More...</p>
        </>
      }
    </Box>
  )
}
export default InstanceUnit