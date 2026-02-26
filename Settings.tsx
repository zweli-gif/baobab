                                />
                                <span className="text-xs">%</span>
                              </div>
                            ) : (
                              <Badge variant="outline" className="text-xs font-semibold">
                                {objective.weight}%
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            {user?.role === 'admin' && (
                              <>
                                {isEditing ? (
                                  <>
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      className="h-7 w-7"
                                      onClick={saveObjectiveEdit}
                                      disabled={updateObjectiveMutation.isPending}
                                    >
                                      {updateObjectiveMutation.isPending ? (
                                        <Loader2 className="h-3 w-3 animate-spin" />
                                      ) : (
                                        <Save className="h-3 w-3" />
                                      )}
                                    </Button>
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      className="h-7 w-7"
                                      onClick={() => setEditingObjectiveId(null)}
                                    >
                                      <span className="text-xs">✕</span>
                                    </Button>
                                  </>
                                ) : (
                                  <>
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      className="h-7 w-7"
                                      onClick={() => startEditingObjective(objective)}
                                    >
                                      <Pencil className="h-3 w-3" />
                                    </Button>
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button
                                          size="icon"
                                          variant="ghost"
                                          className="h-7 w-7 text-muted-foreground hover:text-destructive"
                                        >
                                          <Trash2 className="h-3 w-3" />
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>Delete Objective?</AlertDialogTitle>
                                          <AlertDialogDescription>
                                            This will permanently delete "{objective.name}" and all its KPIs.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                                          <AlertDialogAction
                                            onClick={() => deleteObjectiveMutation.mutate({ id: objective.id })}
                                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                          >
                                            Delete
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                  </>
                                )}
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="h-7 text-xs"
                                  onClick={() => addGoalToObjective(objective.name)}
                                >
                                  <Plus className="h-3 w-3 mr-1" />
                                  Add KPI
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="py-2">
                        {goals.length === 0 ? (
                          <p className="text-sm text-muted-foreground text-center py-4">
                            No KPIs defined. Click "Add KPI" to create one.
                          </p>