const Docker = require('dockerode');
const Container = require('dockerode/lib/container');

const docker = new Docker({ socketPath: "/var/run/docker.sock" })

const getByName = async (name) => {
  const containers = await docker.listContainers({ all: true });
  const found = containers.find((container) => container.Names.find((cname) => cname == `/${name}`));

  if (!found) throw Error(`ContainerError: container with name ${name} not found.`)

  return found
}

const stop = async (containerName) => {
  const container = docker.getContainer((await getByName(containerName)).Id);
  try {
    await container.stop()
  } catch (error) {
    if (error.reason == 'container already stopped') return
    throw error
  }
}

const start = async (containerName) => {
  const container = docker.getContainer((await getByName(containerName)).Id);
    try {
    await container.start()
  } catch (error) {
    if (error.reason == 'container already started') return
    throw error
  }
}

const getVolumeMountpointByContainer = async (containerName, volumePath) => {
  const container = await getByName(containerName);
  const found = container.Mounts.find((mount) => mount.Destination == volumePath)
  if (!found) throw Error(`ContainerError: volume with internal path ${volumePath} not found.`)

  const volume = await docker.getVolume(found.Name).inspect()
  return volume.Mountpoint
}

const getIpByName = async (name) => {
  const container = docker.getContainer((await getByName(name)).Id)
  const networks = (await container.inspect()).NetworkSettings.Networks
  return networks[Object.keys(networks)[0]].IPAddress
}

// const _main = async() => {
//   console.log(await getIpByName("db_ies"))
// }

// _main()

module.exports = {
  getByName,
  start,
  stop,
  getVolumeMountpointByContainer,
  getIpByName,
};
