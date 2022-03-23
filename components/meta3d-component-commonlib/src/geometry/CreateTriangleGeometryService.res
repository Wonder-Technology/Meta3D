let create = (usedComponentContribute, engineCoreService) =>
  (
    [0.0, 0.5, 0., -0.5, -0.5, 0., 0.5, -0.5, 0.],
    [0.5, 1., 0., 0., 1., 0.],
    [0., 0., 1., 0., 0., 1., 0., 0., 1.],
    [0, 1, 2],
  )
  ->ComputePointsGeometryService.addTangents
  ->CreateDefaultGeometryService.create(usedComponentContribute, engineCoreService, _)
